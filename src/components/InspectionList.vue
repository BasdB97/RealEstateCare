<!-- src/components/RealEstateList.vue -->
<template>
	<div class="text-[#1d292f] flex justify-center">
		<h1 class="text-2xl font-bold mb-6">Adressen</h1>
		<div v-if="loading" class="py-4">Laden...</div>
		<div v-else-if="error" class="py-4 text-red-500">{{ error }}</div>
		<div v-else class="space-y-6 px-4">
			<div
				v-for="address in addresses"
				:key="address.id"
				class="address-card bg-white rounded-lg shadow-md p-6">
				<h2>
					{{ address.street }} {{ address.number }},
					{{ address.city }}
				</h2>
				<p>
					Postcode: {{ address.postalCode }} | Land:
					{{ address.country }}
				</p>

				<h3>Rapporten</h3>
				<div
					v-for="report in address.report"
					:key="report.damage_reports.id"
					class="report">
					<!-- Schade rapport -->
					<div class="report-section">
						<h4>Schade Rapport</h4>
						<p>
							<strong>Locatie:</strong>
							{{ report.damage_reports.location }}
						</p>
						<p>
							<strong>Type:</strong>
							{{ report.damage_reports.damageType }}
						</p>
						<p>
							<strong>Datum:</strong>
							{{ report.damage_reports.date }}
						</p>
						<p>
							<strong>Urgent:</strong>
							{{
								report.damage_reports.urgentActionRequired
									? "Ja"
									: "Nee"
							}}
						</p>
						<p>
							<strong>Beschrijving:</strong>
							{{ report.damage_reports.description }}
						</p>
					</div>

					<!-- Achterstallig onderhoud -->
					<div class="report-section">
						<h4>Achterstallig Onderhoud</h4>
						<p>
							<strong>Locatie:</strong>
							{{ report.overdue_maintenance.location }}
						</p>
						<p>
							<strong>Type:</strong>
							{{ report.overdue_maintenance.maintenanceType }}
						</p>
						<p>
							<strong>Urgent:</strong>
							{{
								report.overdue_maintenance.urgentActionRequired
									? "Ja"
									: "Nee"
							}}
						</p>
						<p>
							<strong>Kostenindicatie:</strong>
							{{ report.overdue_maintenance.costIndication }}
						</p>
					</div>

					<!-- Technische installaties -->
					<div class="report-section">
						<h4>Technische Installaties</h4>
						<p>
							<strong>Locatie:</strong>
							{{ report.technicalInstallations.location }}
						</p>
						<p>
							<strong>Type:</strong>
							{{ report.technicalInstallations.installationType }}
						</p>
						<p>
							<strong>Gerapporteerde storing:</strong>
							{{
								report.technicalInstallations
									.reportedMalfunction
							}}
						</p>
						<p>
							<strong>Goedgekeurd:</strong>
							{{
								report.technicalInstallations.approved
									? "Ja"
									: "Nee"
							}}
						</p>
						<p>
							<strong>Opmerkingen:</strong>
							{{ report.technicalInstallations.comments }}
						</p>
					</div>

					<!-- Wijzigingen -->
					<div class="report-section">
						<h4>Wijzigingen</h4>
						<p>
							<strong>Locatie:</strong>
							{{ report.modifications.location }}
						</p>
						<p>
							<strong>Uitgevoerd door:</strong>
							{{ report.modifications.excecutedBy }}
						</p>
						<p>
							<strong>Beschrijving:</strong>
							{{ report.modifications.modificationDescription }}
						</p>
						<p>
							<strong>Actie vereist:</strong>
							{{ report.modifications.actionRequired }}
						</p>
						<p>
							<strong>Opmerkingen:</strong>
							{{ report.modifications.comments }}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
	name: "RealEstateList",
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
