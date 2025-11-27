<template>
	<BaseLayout>
		<BackButton to="/home" />
		<div>
			<h1 class="page-title">Toegewezen rapporten</h1>
			<div v-if="error" class="text-center text-red-600 dark:text-red-400 p-4">
				<p class="mb-2">{{ error }}</p>
				<IonButton
					aria-label="Opnieuw proberen rapporten te laden"
					size="small"
					@click="store.fetchReports(true)"
					>Opnieuw proberen</IonButton
				>
			</div>
			<div v-else-if="assignedReports.length > 0">
				<div class="px-4 pt-2 pb-3">
					<input
						aria-label="Zoek op locatie"
						id="searchLocation"
						v-model="query"
						type="search"
						placeholder="Zoek op locatie..."
						class="w-full rounded-lg border border-slate-300 dark:border-slate-600 px-3 py-2 text-sm bg-white dark:bg-slate-800 dark:text-white" />
				</div>

				<IonAccordionGroup
					expand="inset"
					class="m-2 p-2 rounded-lg space-y-2"
					v-if="filteredReports.length > 0">
					<IonAccordion
						:aria-label="`Rapport ${r.location}`"
						v-for="r in filteredReports || []"
						:key="r?.id">
						<IonItem slot="header">
							<IonLabel>
								<h2 class="text-slate-800 dark:text-white">
									{{ r.location.split(", ")[0] }}
								</h2>
								<p class="text-slate-500 dark:text-slate-400">
									{{ r.location.split(", ")[1] }} - {{ r.location.split(", ")[2] }}
								</p>
								<p class="text-xs text-slate-400">{{ r.inspections.length }} inspecties</p>
							</IonLabel>
						</IonItem>

						<div
							slot="content"
							class="ion-padding m-2 border-2 border-slate-200 dark:border-slate-600 rounded-lg">
							<section>
								<div
									class="mb-2 flex justify-between w-full border-b border-primarybg dark:border-slate-400">
									<h2 class="text-primarybg dark:text-white text-3xl font-medium">
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
										<IonLabel class="mb-0 pb-0 dark:text-white">{{
											getInspectionLabel(inspection)
										}}</IonLabel>
										<IonBadge v-if="hasUrgentAction(inspection)" color="danger" class="py-1"
											>Urgent!</IonBadge
										>
									</IonItem>
								</IonList>
							</section>
							<div class="flex justify-center">
								<IonButton
									aria-label="Rapport openen"
									@click="openReport(r.id)"
									class="mt-4"
									expand="block">
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
import BackButton from "@/components/BackButton.vue";

import { onMounted, computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { getInspectionLabel, hasUrgentAction, isEmptyInspection } from "@/utils/reportHelpers";
import {
	IonAccordionGroup,
	IonAccordion,
	IonList,
	IonItem,
	IonLabel,
	IonBadge,
	IonButton,
} from "@ionic/vue";

import { useReportsStore } from "@/stores/reports";
import { useRouter } from "vue-router";

const store = useReportsStore();
const router = useRouter();
const { assignedReports, error } = storeToRefs(store);

const query = ref("");

const openReport = (id) => router.push({ name: "edit-report", params: { id } });

const filteredReports = computed(() => {
	if (!query.value) return assignedReports.value;
	const q = query.value.toLowerCase();
	return assignedReports.value.filter((r) => r.location.toLowerCase().includes(q));
});

onMounted(async () => {
	await store.fetchReports();
});
</script>

<style scoped>
#loading-spinner {
	margin: 0 auto;
}
</style>
