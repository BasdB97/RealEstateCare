<!-- src/components/InspectionList.vue -->
<template>
	<div class="w-full max-w-4xl overflow-y-auto max-h-[calc(100vh-300px)]">
		<div
			v-for="property in properties"
			:key="property.id"
			class="mb-6 p-4 bg-white rounded-lg shadow-md">
			<h2 class="text-xl font-semibold mb-2">{{ property.street }} {{ property.number }}</h2>
			<p class="text-gray-600">{{ property.postalCode }} {{ property.city }}</p>

			<div v-if="property.report && property.report.length > 0" class="mt-4">
				<div v-for="(report, index) in property.report" :key="index" class="space-y-4">
					<!-- Damage Reports -->
					<div v-if="report.damage_reports" class="border-l-4 border-red-500 pl-3">
						<h3 class="font-medium">Schade Melding</h3>
						<p>Locatie: {{ report.damage_reports.location }}</p>
						<p>Type: {{ report.damage_reports.damageType }}</p>
						<p>Datum: {{ report.damage_reports.date }}</p>
						<p>Beschrijving: {{ report.damage_reports.description }}</p>
					</div>

					<!-- Overdue Maintenance -->
					<div
						v-if="report.overdue_maintenance"
						class="border-l-4 border-yellow-500 pl-3">
						<h3 class="font-medium">Onderhoud</h3>
						<p>Locatie: {{ report.overdue_maintenance.location }}</p>
						<p>Type: {{ report.overdue_maintenance.maintenanceType }}</p>
						<p>Kosten: {{ report.overdue_maintenance.costIndication }}</p>
					</div>

					<!-- Technical Installations -->
					<div
						v-if="report.technicalInstallations"
						class="border-l-4 border-blue-500 pl-3">
						<h3 class="font-medium">Technische Installatie</h3>
						<p>Locatie: {{ report.technicalInstallations.location }}</p>
						<p>Type: {{ report.technicalInstallations.installationType }}</p>
						<p>Storing: {{ report.technicalInstallations.reportedMalfunction }}</p>
						<p>Opmerkingen: {{ report.technicalInstallations.comments }}</p>
					</div>

					<!-- Modifications -->
					<div v-if="report.modifications" class="border-l-4 border-green-500 pl-3">
						<h3 class="font-medium">Aanpassingen</h3>
						<p>Locatie: {{ report.modifications.location }}</p>
						<p>Uitgevoerd door: {{ report.modifications.excecutedBy }}</p>
						<p>Beschrijving: {{ report.modifications.modificationDescription }}</p>
						<p>Actie nodig: {{ report.modifications.actionRequired }}</p>
						<p>Opmerkingen: {{ report.modifications.comments }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "@ionic/vue";

export default {
	setup() {
		const addresses = ref([]);
		const loading = ref(true);
		const error = ref(null);

		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://my-json-server.typicode.com/BasdB97/RealEstateCare/addresses"
				);
				if (!response.ok) {
					throw new Error("Netwerkfout bij het ophalen van de data");
				}
				const data = await response.json();
				addresses.value = data;
			} catch (err) {
				error.value = err.message;
			} finally {
				loading.value = false;
			}
		};

		onMounted(fetchData);

		return {
			addresses,
			loading,
			error,
		};
	},
};
</script>
