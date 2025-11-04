<template>
	<BaseLayout :title="report ? report.location : 'Rapport'">
		<IonSpinner v-if="loading" name="circles" id="loading-spinner" />
		<div v-else-if="error" class="text-red-600">{{ error }}</div>
		<div v-else>
			<IonCard class="p-4" v-if="report">
				<IonCardHeader>
					<IonCardTitle class="text-2xl font-bold text-primarybg"
						>{{ report.location.split(", ")[0] }},
						{{ report.location.split(", ")[2] }}</IonCardTitle
					>
					<IonCardSubtitle class="text-slate-600">Datum: {{ report.reportDate }}</IonCardSubtitle>
				</IonCardHeader>

				<IonAccordionGroup v-if="report.inspections.length > 0">
					<IonAccordion v-for="(inspection, index) in report.inspections" :key="index" class="mb-4">
						<IonItem slot="header">
							<IonLabel>{{ getInspectionLabel(inspection) }}</IonLabel>
							<IonBadge v-if="hasUrgentAction(inspection)" color="danger" class="py-1"
								>Urgent!</IonBadge
							>
						</IonItem>
						<!-- TODO: Add component for each inspection type -->
						<div slot="content">
							<div v-if="inspection.type === 'damage'">Schade opnemen component</div>
							<div v-if="inspection.type === 'overdueMaintenance'">
								Achterstallig onderhoud opnemen component
							</div>
							<div v-if="inspection.type === 'technicalInstallation'">
								Technische installaties inspecteren component
							</div>
							<div v-if="inspection.type === 'modification'">
								Modificaties inventariseren component
							</div>
						</div>
					</IonAccordion>
				</IonAccordionGroup>
			</IonCard>
		</div>
	</BaseLayout>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
	IonList,
	IonItem,
	IonLabel,
	IonBadge,
	IonSpinner,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonAccordionGroup,
	IonAccordion,
} from "@ionic/vue";
import { useReportsStore } from "@/stores/reports";
import { getInspectionLabel, hasUrgentAction } from "@/utils/reportHelpers";

const route = useRoute();
const router = useRouter();
const id = Number(route.params.id);

const store = useReportsStore();

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
