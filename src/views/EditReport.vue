<template>
	<BaseLayout :title="report ? report.location : 'Rapport'">
		<IonSpinner v-if="loading" name="circles" id="loading-spinner" />
		<div v-else-if="error" class="text-red-600">{{ error }}</div>
		<div v-else>
			<IonCard class="" v-if="report">
				<IonCardHeader>
					<IonCardTitle class="text-2xl font-bold text-primarybg border-b border-primarybg"
						>{{ report.location.split(", ")[0] }},
						{{ report.location.split(", ")[2] }}
					</IonCardTitle>
				</IonCardHeader>

				<IonAccordionGroup v-if="report.inspections.length > 0">
					<IonAccordion
						v-for="inspection in report.inspections"
						:key="`${inspection.type}-${inspection.id}`"
						:value="`${inspection.type}-${inspection.id}`"
						class="mb-4">
						<IonItem slot="header">
							<IonLabel>{{ getInspectionLabel(inspection) }}</IonLabel>
							<IonBadge v-if="hasUrgentAction(inspection)" color="danger" class="py-1"
								>Urgent!</IonBadge
							>
						</IonItem>
						<!-- TODO: Add component for each inspection type -->
						<div slot="content">
							<DamageReport
								v-if="inspection.type === 'damage'"
								:inspection="inspection"
								@saveLocalChanges="(payload) => saveLocalChanges(report.id, payload)" />
							<OverdueMaintenanceReport
								v-if="inspection.type === 'overdueMaintenance'"
								:inspection="inspection"
								@saveLocalChanges="(payload) => saveLocalChanges(report.id, payload)" />
							<TechnicalInstallationReport
								v-if="inspection.type === 'technicalInstallation'"
								:inspection="inspection"
								@saveLocalChanges="(payload) => saveLocalChanges(report.id, payload)" />
							<ModificationReport v-if="inspection.type === 'modification'"></ModificationReport>
						</div>
					</IonAccordion>
				</IonAccordionGroup>
			</IonCard>
			<IonToast
				:is-open="toastOpen"
				:message="toastMessage"
				duration="1500"
				position="bottom"
				@didDismiss="toastOpen = false" />
			<div class="flex flex-col gap-3 mt-6 p-4">
				<IonButton
					expand="block"
					color="medium"
					class="rounded-lg font-semibold"
					@click="saveDraft">
					Rapport opslaan, niet afronden
				</IonButton>

				<IonButton
					expand="block"
					color="success"
					class="rounded-lg font-semibold"
					@click="completeReport">
					Rapport opslaan en afronden
				</IonButton>
			</div>
		</div>
	</BaseLayout>
</template>

<script setup>
import DamageReport from "@/components/reports/DamageReport.vue";
import OverdueMaintenanceReport from "@/components/reports/OverdueMaintenanceReport.vue";
import TechnicalInstallationReport from "@/components/reports/TechnicalInstallationReport.vue";
import ModificationReport from "@/components/reports/ModificationReport.vue";

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
	IonSpinner,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonToast,
	IonAccordionGroup,
	IonAccordion,
} from "@ionic/vue";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);
const store = useReportsStore();
const toastOpen = ref(false);
const toastMessage = ref("");
const { loading, error } = storeToRefs(store);

async function saveLocalChanges(reportId, updated) {
	store.updateInspectionLocal(reportId, updated);
	toastMessage.value = "Inspectie opgeslagen";
	toastOpen.value = true;
}

async function saveDraft() {
	try {
		await store.persistReportWithStatus(report.value.id, false);
		toastMessage.value = "Rapport opgeslagen, nog niet afgerond";
		toastOpen.value = true;
		setTimeout(() => router.push("/assigned-reports"), 1500);
	} catch (error) {
		toastMessage.value = "Fout bij opslaan: " + (error.message || "Probeer opnieuw");
		toastOpen.value = true;
	}
}

async function completeReport() {
	try {
		await store.persistReportWithStatus(report.value.id, true);
		toastMessage.value = "Rapport opgeslagen en afgerond";
		toastOpen.value = true;
		// Wacht kort zodat gebruiker de toast ziet, dan redirect
		setTimeout(() => router.push("/assigned-reports"), 1500);
	} catch (error) {
		toastMessage.value = "Fout bij opslaan: " + (error.message || "Probeer opnieuw");
		toastOpen.value = true;
		// Geen redirect bij error
	}
}

onMounted(async () => {
	if (!store.reports?.length) {
		await store.fetchReports();
	}
	if (!store.getReportById(id)) {
		router.replace({ name: "assignedReports" }); // fallback als id niet bestaat
	}
});

const report = computed(() => store.getReportById(id));
</script>
