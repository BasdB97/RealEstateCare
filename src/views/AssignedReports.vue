<template>
	<BaseLayout>
		<div class="p-4">
			<IonSpinner v-if="loading" name="circles" id="loading-spinner" />
			<div v-else-if="error" class="text-red-600">{{ error }}</div>
			<ul v-else class="space-y-3">
				<li
					v-for="r in assignedReports || []"
					:key="r?.id"
					class="p-4 rounded-lg ring-1 ring-slate-200">
					<p class="font-semibold">{{ r?.location }}</p>
					<p class="text-sm text-slate-600">Datum: {{ r?.reportDate }}</p>
				</li>
			</ul>
		</div>
	</BaseLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { IonSpinner } from "@ionic/vue";
import { useReportsStore } from "@/stores/reports";

const store = useReportsStore();
const { assignedReports, loading, error } = storeToRefs(store);

onMounted(async () => {
	if (!store.reports.length) {
		await store.fetchReports();
	}
});
</script>

<style scoped>
#loading-spinner {
	margin: 0 auto;
}
</style>
