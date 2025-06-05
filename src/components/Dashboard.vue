<template>
	<main
		id="dashboard"
		class="mx-auto p-4 flex flex-col justify-center items-center text-[#1d292f] h-[calc(100vh-10rem)]">
		<div class="grid grid-cols-2 gap-6 mb-8">
			<div class="flex flex-col items-center justify-center py-4 px-2 shadow-lg rounded-lg">
				<ion-icon
					:icon="bookmarkOutline"
					class="text-6xl sm:text-7xl md:text-9xl font-bold" />
				<span class="text-lg sm:text-xl md:text-2xl font-bold">Scheduled</span>
			</div>
			<div class="flex flex-col items-center justify-center py-4 px-2 shadow-lg rounded-lg">
				<ion-icon
					:icon="checkmarkCircle"
					class="text-6xl sm:text-7xl md:text-9xl font-bold" />
				<span class="text-lg sm:text-xl md:text-2xl font-bold">Completed</span>
			</div>
			<div class="flex flex-col items-center justify-center py-4 px-2 shadow-lg rounded-lg">
				<ion-icon :icon="apps" class="text-6xl sm:text-7xl md:text-9xl font-bold" />
				<span class="text-lg sm:text-xl md:text-2xl font-bold">Knowledge Base</span>
			</div>
			<div class="flex flex-col items-center justify-center py-4 px-2 shadow-lg rounded-lg">
				<ion-icon :icon="settings" class="text-6xl sm:text-7xl md:text-9xl font-bold" />
				<span class="text-lg sm:text-xl md:text-2xl font-bold">Settings</span>
			</div>
		</div>

		<div class="text-[#1d292f] w-full max-w-4xl overflow-y-auto max-h-[calc(100vh-300px)]">
			<h1 class="text-2xl font-bold mb-6">Addresses</h1>
			<div v-if="loading" class="py-4">Loading...</div>
			<div v-else-if="error" class="py-4 text-red-500">{{ error }}</div>
			<div v-else class="space-y-6 px-4">
				<div
					v-for="address in addresses"
					:key="address.id"
					class="address-card bg-white rounded-lg shadow-md p-6 !mb-2">
					<h2>
						{{ address.street }} {{ address.number }},
						{{ address.city }}
					</h2>
					<p>Postal Code: {{ address.postalCode }} - {{ address.country }}</p>

					<h3>Reports</h3>
					<div
						v-for="report in address.report"
						:key="report.damage_reports.id"
						class="report">
						<!-- Damage report -->
						<div class="report-section">
							<h4 class="font-bold">Damage Report</h4>
							<p>
								<strong>Location:</strong>
								{{ report.damage_reports.location }}
							</p>
							<p>
								<strong>Type:</strong>
								{{ report.damage_reports.damageType }}
							</p>
							<p>
								<strong>Date:</strong>
								{{ report.damage_reports.date }}
							</p>
							<p>
								<strong>Urgent:</strong>
								{{ report.damage_reports.urgentActionRequired ? "Yes" : "No" }}
							</p>
							<p>
								<strong>Description:</strong>
								{{ report.damage_reports.description }}
							</p>
						</div>

						<!-- Overdue Maintenance -->
						<div class="report-section">
							<h4 class="text-lg font-bold">Overdue Maintenance</h4>
							<p>
								<strong>Location:</strong>
								{{ report.overdue_maintenance.location }}
							</p>
							<p>
								<strong>Type:</strong>
								{{ report.overdue_maintenance.type }}
							</p>
							<p>
								<strong>Urgent:</strong>
								{{ report.overdue_maintenance.urgentActionRequired ? "Yes" : "No" }}
							</p>
							<p>
								<strong>Cost indication:</strong>
								{{ report.overdue_maintenance.costIndication }}
							</p>
						</div>

						<!-- Technical installations -->
						<div class="report-section">
							<h4 class="text-lg font-bold">Technical Installations</h4>
							<p>
								<strong>Location:</strong>
								{{ report.technicalInstallations.location }}
							</p>
							<p>
								<strong>Type:</strong>
								{{ report.technicalInstallations.installationType }}
							</p>
							<p>
								<strong>Reported malfunction:</strong>
								{{ report.technicalInstallations.reportedMalfunction }}
							</p>
							<p>
								<strong>Approved:</strong>
								{{ report.technicalInstallations.approved ? "Yes" : "No" }}
							</p>
							<p>
								<strong>Comments:</strong>
								{{ report.technicalInstallations.comments }}
							</p>
						</div>

						<!-- Modifications -->
						<div class="report-section">
							<h4 class="text-lg font-bold">Modifications</h4>
							<p>
								<strong>Location:</strong>
								{{ report.modifications.location }}
							</p>
							<p>
								<strong>Executed by:</strong>
								{{ report.modifications.executedBy }}
							</p>
							<p>
								<strong>Description:</strong>
								{{ report.modifications.modificationDescription }}
							</p>
							<p>
								<strong>Action required:</strong>
								{{ report.modifications.actionRequired }}
							</p>
							<p>
								<strong>Comments:</strong>
								{{ report.modifications.comments }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<script setup>
import { bookmarkOutline, checkmarkCircle, apps, settings } from "ionicons/icons";
import { ref, onMounted, computed } from "vue";
import { apiService } from "../services/apiService";

const addresses = ref([]);
const loading = ref(false);
const error = ref(null);

const sortedAddresses = computed(() => {
	return addresses.value.map((address) => ({
		...address,
		report: [...address.report].sort(
			(a, b) => new Date(a.damage_reports.date) - new Date(b.damage_reports.date)
		),
	}));
});

const fetchData = async () => {
	loading.value = true;
	try {
		addresses.value = await apiService.getAddresses();
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
