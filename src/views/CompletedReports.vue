<!-- src/views/CompletedReports.vue -->
<template>
	<BaseLayout title="Uitgevoerde rapporten">
		<IonSpinner v-if="loading" name="circles" />
		<div v-else-if="error" class="text-red-600 dark:text-red-400">{{ error }}</div>

		<div
			v-else
			class="m-2 p-2 border-2 border-primarybg dark:border-slate-600 rounded-lg shadow-md space-y-2">
			<p v-if="completed.length === 0" class="text-slate-500 dark:text-slate-400">
				Nog geen uitgevoerde rapporten.
			</p>

			<IonList v-else class="divide-y divide-slate-200 dark:divide-slate-600">
				<IonItem v-for="r in completed" :key="r.id" button @click="openReport(r.id)">
					<IonLabel>
						<h2 class="font-semibold dark:text-slate-100">
							{{ r.location.split(", ")[0] }}, {{ r.location.split(", ")[2] }}
						</h2>
						<p class="text-sm text-slate-500 dark:text-slate-400">Datum: {{ r.reportDate }}</p>
					</IonLabel>
					<IonBadge color="success">Afgerond</IonBadge>
				</IonItem>
			</IonList>
		</div>
	</BaseLayout>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { IonSpinner, IonList, IonItem, IonLabel, IonBadge } from "@ionic/vue";
import BaseLayout from "@/components/BaseLayout.vue";
import { useReportsStore } from "@/stores/reports";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useReportsStore();
const { loading, error, reports } = storeToRefs(store);

// Haal direct uit de getter
const completed = computed(() => store.completedReports);

onMounted(async () => {
	if (!reports.value?.length) await store.fetchReports();
});

const openReport = (id) => router.push({ name: "edit-report", params: { id } });
</script>
