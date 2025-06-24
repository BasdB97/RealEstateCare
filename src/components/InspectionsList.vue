<template>
	<div class="p-4 max-w-2xl mx-auto">
		<h2>Inspections List</h2>
		<div v-if="loading" class="loading text-gray-600">Loading reports...</div>
		<div v-else-if="error" class="error text-red-600 p-4 bg-red-100 rounded-md">
			{{ error }}
		</div>
		<div v-else-if="reports.length === 0" class="no-data text-gray-500">
			No inspections found.
		</div>
		<div v-else>
			<h1>Reports</h1>
			<ul class="report-list">
				<li
					class="mb-2 p-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
					@click="viewReport(report.id)"
					v-for="report in reports"
					:key="report.id">
					{{ report.street }} {{ report.number }}
				</li>
			</ul>
		</div>
		<div class="mt-4">
			<ReportDetail
				v-if="selectedReport"
				:report="selectedReport"
				@close="closeReportDetail" />
		</div>
	</div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { apiService } from "@/services/apiService";
import ReportDetail from "@/components/ReportDetail.vue";

export default {
	name: "InspectionsList",
	components: {
		ReportDetail,
	},
	setup() {
		const reports = ref([]);
		const loading = ref(true);
		const error = ref(null);
		const selectedReportId = ref(null);

		const fetchReports = async () => {
			try {
				reports.value = await apiService.getReports();
			} catch (err) {
				error.value = err.message || "Failed to load inspections.";
			} finally {
				loading.value = false;
			}
		};

		const viewReport = (id) => {
			selectedReportId.value = id;
		};

		const closeReportDetail = () => {
			selectedReportId.value = null;
		};

		const selectedReport = computed(() => {
			if (!selectedReportId.value) return null;
			return reports.value.find((report) => report.id === selectedReportId.value);
		});

		onMounted(fetchReports);

		return {
			reports,
			loading,
			error,
			selectedReport,
			viewReport,
			closeReportDetail,
		};
	},
};
</script>
