<template>
	<BaseLayout>
		<div v-if="error" class="text-red-600 dark:text-red-400">{{ error }}</div>
		<div v-else-if="report">
			<BackButton />
			<IonCard class="">
				<IonCardHeader>
					<IonCardSubtitle v-if="isCompleted" class="text-red-500 dark:text-red-400">
						Dit rapport is afgerond en alleen nog ter inzage.
					</IonCardSubtitle>
					<IonCardTitle
						class="text-2xl font-bold text-primarybg dark:text-white border-b border-primarybg dark:border-slate-400">
						{{ (report.location || "").split(", ")[0] || report.location }},
						<template v-if="(report.location || '').split(', ')[2]">
							{{ report.location.split(", ")[2] }}
						</template>
					</IonCardTitle>
				</IonCardHeader>

				<IonAccordionGroup v-if="report.inspections.length > 0" v-model="openAccordion" class="p-2">
					<IonAccordion
						v-for="(inspection, index) in report.inspections"
						:key="
							inspection.id != null
								? `${inspection.type}-${inspection.id}`
								: `${inspection.type}-${index}`
						"
						:value="
							inspection.id != null
								? `${inspection.type}-${inspection.id}`
								: `${inspection.type}-${index}`
						"
						class="mb-4">
						<IonItem slot="header" class="dark:text-slate-400">
							<IonLabel>{{ getInspectionLabel(inspection) }}</IonLabel>
							<IonBadge v-if="hasUrgentAction(inspection)" color="danger" class="py-1"
								>Urgent!</IonBadge
							>
						</IonItem>

						<div slot="content">
							<component
								:is="typeMap[inspection.type]"
								:ref="(el) => setInspectionRef(el, inspection)"
								:inspection="inspection"
								:isCompleted="isCompleted"
								@saveLocalChanges="(p) => saveLocalChanges(report.id, p)" />
						</div>
					</IonAccordion>
				</IonAccordionGroup>
			</IonCard>

			<div class="flex flex-col gap-3 mt-6 p-4" v-if="!isCompleted">
				<IonButton
					expand="block"
					color="primary"
					class="rounded-lg font-semibold"
					:disabled="isSavingDraft || isSavingComplete"
					@click="saveDraft">
					{{ isSavingDraft ? "Opslaan..." : "Rapport opslaan" }}
					<IonSpinner v-if="isSavingDraft" name="crescent" />
				</IonButton>

				<IonButton
					expand="block"
					color="success"
					class="rounded-lg font-semibold"
					:disabled="isSavingDraft || isSavingComplete"
					@click="completeReport">
					{{ isSavingComplete ? "Opslaan..." : "Rapport opslaan en afronden" }}
					<IonSpinner v-if="isSavingComplete" name="crescent" />
				</IonButton>
			</div>

			<IonToast
				:is-open="showToast"
				:message="toastMessage"
				:color="toastColor"
				:duration="2000"
				position="top"
				@didDismiss="showToast = false" />
		</div>
	</BaseLayout>
</template>

<script setup>
import DamageReport from "@/components/reports/DamageReport.vue";
import OverdueMaintenanceReport from "@/components/reports/OverdueMaintenanceReport.vue";
import TechnicalInstallationReport from "@/components/reports/TechnicalInstallationReport.vue";
import ModificationReport from "@/components/reports/ModificationReport.vue";
import BackButton from "@/components/BackButton.vue";

import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useReportsStore } from "@/stores/reports";
import { getInspectionLabel, hasUrgentAction } from "@/utils/reportHelpers";
import { storeToRefs } from "pinia";

import {
	IonButton,
	IonItem,
	IonLabel,
	IonBadge,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonToast,
	IonAccordionGroup,
	IonAccordion,
	IonSpinner,
} from "@ionic/vue";

const typeMap = {
	damage: DamageReport,
	overdueMaintenance: OverdueMaintenanceReport,
	technicalInstallation: TechnicalInstallationReport,
	modification: ModificationReport,
};

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const store = useReportsStore();
const { error } = storeToRefs(store);
const openAccordion = ref(null);
const isCompleted = computed(() => !!report.value?.completed);
const inspectionRefs = ref({});
const isSavingDraft = ref(false);
const isSavingComplete = ref(false);

// Toast state
const showToast = ref(false);
const toastMessage = ref("");
const toastColor = ref("success");

function setInspectionRef(el, inspection) {
	const key =
		inspection.id != null
			? `${inspection.type}-${inspection.id}`
			: `${inspection.type}-${report.value.inspections.indexOf(inspection)}`;

	if (el) {
		inspectionRefs.value[key] = el;
	} else {
		delete inspectionRefs.value[key];
	}
}

function showToastMessage(message, color = "success") {
	toastMessage.value = message;
	toastColor.value = color;
	showToast.value = true;
}

async function saveLocalChanges(reportId, updated) {
	store.updateInspectionLocal(reportId, updated);
	openAccordion.value = null;
}

async function saveDraft() {
	isSavingDraft.value = true;
	// First, trigger save on all child components to ensure no data loss
	// (don't check isDirty due to 150ms debounce race condition)
	for (const componentRef of Object.values(inspectionRefs.value)) {
		if (componentRef && componentRef.saveLocalChanges) {
			componentRef.saveLocalChanges();
		}
	}
	try {
		await store.persistReportWithStatus(report.value.id, false);
		showToastMessage("Rapport opgeslagen, nog niet afgerond", "success");
	} catch (error) {
		showToastMessage("Fout bij opslaan: " + (error.message || "Probeer opnieuw"), "danger");
	}
	isSavingDraft.value = false;
}

async function completeReport() {
	isSavingComplete.value = true;
	// First, trigger save on all child components to ensure no data loss
	// (don't check isDirty due to 150ms debounce race condition)
	for (const componentRef of Object.values(inspectionRefs.value)) {
		if (componentRef && componentRef.saveLocalChanges) {
			componentRef.saveLocalChanges();
		}
	}

	try {
		if (await store.persistReportWithStatus(report.value.id, true)) {
			showToastMessage("Rapport opgeslagen en afgerond", "success");
			router.push("/assigned-reports");
		} else {
			showToastMessage(
				"Fout bij opslaan en afronden: " + (error.message || "Probeer opnieuw"),
				"danger"
			);
		}
	} catch (error) {
		showToastMessage(
			"Fout bij opslaan en afronden: " + (error.message || "Probeer opnieuw"),
			"danger"
		);
	}
	isSavingComplete.value = false;
}

onMounted(async () => {
	if (!store.reports?.length) {
		await store.fetchReports();
	}
	if (!store.getReportById(id)) {
		router.replace({ name: "assignedReports" });
	}
});

const report = computed(() => store.getReportById(id));
</script>
