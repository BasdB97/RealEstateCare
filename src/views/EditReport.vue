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
					color="medium"
					class="rounded-lg font-semibold"
					@click="saveDraft">
					Rapport opslaan
				</IonButton>

				<IonButton
					expand="block"
					color="success"
					class="rounded-lg font-semibold"
					@click="completeReport">
					Rapport opslaan en afronden
				</IonButton>
			</div>

			<IonToast
				:is-open="toastOpen"
				:message="toastMessage"
				duration="1500"
				position="bottom"
				@didDismiss="toastOpen = false" />
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
const toastOpen = ref(false);
const toastMessage = ref("");
const { error } = storeToRefs(store);
const openAccordion = ref(null);
const isCompleted = computed(() => !!report.value?.completed);
const inspectionRefs = ref({});

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

function toast(message) {
	toastMessage.value = message;
	toastOpen.value = true;
}

async function saveLocalChanges(reportId, updated) {
	store.updateInspectionLocal(reportId, updated);
	toast("Inspectie opgeslagen");
	openAccordion.value = null;
}

async function saveDraft() {
	// First, trigger save on all child components to ensure no data loss
	// (don't check isDirty due to 150ms debounce race condition)
	for (const componentRef of Object.values(inspectionRefs.value)) {
		if (componentRef && componentRef.saveLocalChanges) {
			componentRef.saveLocalChanges();
		}
	}
	try {
		await store.persistReportWithStatus(report.value.id, false);
		toast("Rapport opgeslagen, nog niet afgerond");
	} catch (error) {
		toast("Fout bij opslaan: " + (error.message || "Probeer opnieuw"));
	}
}

async function completeReport() {
	// First, trigger save on all child components to ensure no data loss
	// (don't check isDirty due to 150ms debounce race condition)
	for (const componentRef of Object.values(inspectionRefs.value)) {
		if (componentRef && componentRef.saveLocalChanges) {
			componentRef.saveLocalChanges();
		}
	}
  
	try {
		if (await store.persistReportWithStatus(report.value.id, true)) {
			toast("Rapport opgeslagen en afgerond");
			router.push("/assigned-reports");
		} else {
			toast("Fout bij opslaan: " + (error.message || "Probeer opnieuw"));
		}
	} catch (error) {
		toast("Fout bij opslaan: " + (error.message || "Probeer opnieuw"));
	}
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
