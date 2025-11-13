<template>
	<BaseLayout>
		<div>
			<IonSpinner v-if="loading" name="circles" id="loading-spinner" />
			<div v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</div>
			<div v-else>
				<IonAccordionGroup
					expand="inset"
					class="m-2 p-2 rounded-lg space-y-2"
					v-if="assignedReports.length > 0">
					<IonAccordion v-for="r in assignedReports || []" :key="r?.id">
						<IonItem slot="header">
							<IonLabel>
								<h2 class="text-slate-800 dark:text-slate-100">
									{{ r.location.split(", ")[0] }}, {{ r.location.split(", ")[2] }}
								</h2>
								<p class="text-slate-500 dark:text-slate-400">{{ r.location.split(", ")[1] }}</p>
							</IonLabel>
						</IonItem>

						<div
							slot="content"
							id="content"
							class="ion-padding m-2 border-2 border-slate-200 dark:border-slate-600 rounded-lg">
							<section>
								<div
									class="mb-2 flex justify-between w-full border-b border-primarybg dark:border-slate-400">
									<h2 class="text-primarybg dark:text-slate-100 text-3xl font-medium">
										Uit te voeren inspecties:
									</h2>
								</div>
							</section>
							<section>
								<IonList>
									<IonItem
										v-for="(inspection, index) in r.inspections.filter(
											(i) => !isEmptyInspection(i)
										)"
										:key="index">
										<IonLabel class="mb-0 pb-0 dark:text-slate-100">{{
											getInspectionLabel(inspection)
										}}</IonLabel>
										<IonBadge v-if="hasUrgentAction(inspection)" color="danger" class="py-1"
											>Urgent!</IonBadge
										>
									</IonItem>
								</IonList>
							</section>
							<div class="flex justify-center">
								<IonButton @click="openReport(r.id)" class="mt-4" expand="block">
									Rapport openen
								</IonButton>
							</div>
						</div>
					</IonAccordion>
				</IonAccordionGroup>
				<div v-else>
					<p class="text-center text-slate-500 dark:text-slate-400">
						Geen uit te voeren inspecties gevonden
					</p>
				</div>
			</div>
		</div>
	</BaseLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { getInspectionLabel, hasUrgentAction, isEmptyInspection } from "@/utils/reportHelpers";
import {
	IonAccordionGroup,
	IonAccordion,
	IonList,
	IonItem,
	IonLabel,
	IonBadge,
	IonSpinner,
	IonButton,
} from "@ionic/vue";

import { useReportsStore } from "@/stores/reports";
import { useRouter } from "vue-router";

const store = useReportsStore();
const router = useRouter();
const { assignedReports, loading, error } = storeToRefs(store);

const openReport = (id) => router.push({ name: "edit-report", params: { id } });

onMounted(async () => {
	await store.fetchReports();
});
</script>

<style scoped>
#loading-spinner {
	margin: 0 auto;
}
</style>
