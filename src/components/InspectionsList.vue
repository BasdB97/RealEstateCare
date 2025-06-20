<template>
	<div>
		<h1>Inspections List</h1>
		<div v-if="loading">Loading...</div>
		<div v-else-if="error">Error: {{ error }}</div>
		<div v-else>
			<div v-for="report in reports" :key="report.id">
				<h2>{{ report.street }} {{ report.number }}</h2>
        
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { apiService } from "../services/apiService";

const reports = ref([]);
const loading = ref(false);
const error = ref(null);

const fetchData = async () => {
	loading.value = true;
	try {
		reports.value = await apiService.getReports();
	} catch (err) {
		error.value = err.message;
	} finally {
		loading.value = false;
	}
};

onMounted(() => {
	fetchData();
});
</script>
