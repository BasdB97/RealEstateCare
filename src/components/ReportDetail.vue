<template>
	<div v-if="report && report.id" class="p-4">
		<div class="header mb-4">
			<h3>Inspection Details for {{ report.id }}</h3>
			<button class="close-button" @click="$emit('close')">×</button>
		</div>
		<div
			v-for="inspection in report.inspections"
			:key="inspection.id"
			class="inspection-card p-4 rounded-lg shadow-md bg-white">
			<div class="report-section">
				<h3 class="text-xl font-bold text-blue-600">Damage Report</h3>
				<div class="grid grid-cols-2 gap-4" v-if="inspection.damage_report">
					<div class="report-item">
						<span class="font-semibold">Location: </span>
						<span>{{ inspection.damage_report.location }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">New Damage: </span>
						<span>{{ inspection.damage_report.new ? "Yes" : "No" }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Damage Type: </span>
						<span>{{ inspection.damage_report.damageType }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Date: </span>
						<span>{{ inspection.damage_report.date }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Urgent action required: </span>
						<span>{{
							inspection.damage_report.urgentActionRequired ? "Yes" : "No"
						}}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Description: </span>
						<span>{{ inspection.damage_report.description }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Photos: </span>
						<span>{{ inspection.damage_report.photos }}</span>
					</div>
				</div>
				<div v-else>
					<p>No damage report entries found</p>
				</div>
			</div>

			<div class="report-section">
				<h3 class="text-xl font-bold text-blue-600">Overdue Maintenance</h3>
				<div class="grid grid-cols-2 gap-4" v-if="inspection.overdue_maintenance">
					<div class="report-item">
						<span class="font-semibold">Location: </span>
						<span>{{ inspection.overdue_maintenance.location }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Type: </span>
						<span>{{ inspection.overdue_maintenance.maintenanceType }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Action Required: </span>
						<span>{{
							inspection.overdue_maintenance.urgentActionRequired ? "Yes" : "No"
						}}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Cost Indication: €</span>
						<span>{{ inspection.overdue_maintenance.costIndication }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Photos: </span>
						<span>{{ inspection.overdue_maintenance.photos }}</span>
					</div>
				</div>
				<div v-else>
					<p>No overdue maintenance entries found</p>
				</div>
			</div>

			<div class="report-section">
				<h3 class="text-xl font-bold text-blue-600">Technical Installation</h3>
				<div class="grid grid-cols-2 gap-4" v-if="inspection.technicalInstallation">
					<div class="report-item">
						<span class="font-semibold">Location: </span>
						<span>{{ inspection.technicalInstallation.location }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Type: </span>
						<span>{{ inspection.technicalInstallation.installationType }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Reported Malfunction: </span>
						<span>{{ inspection.technicalInstallation.reportedMalfunction }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Test Procedure: </span>
						<span>{{ inspection.technicalInstallation.testProcedure }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Approved: </span>
						<span>{{ inspection.technicalInstallation.approved ? "Yes" : "No" }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Comments: </span>
						<span>{{ inspection.technicalInstallation.comments }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Photos: </span>
						<span>{{ inspection.technicalInstallation.photos }}</span>
					</div>
				</div>
				<div v-else>
					<p>No technical installation entries found</p>
				</div>
			</div>

			<div class="report-section">
				<h3 class="text-xl font-bold text-blue-600">Modification</h3>
				<div class="grid grid-cols-2 gap-4" v-if="inspection.modification">
					<div class="report-item">
						<span class="font-semibold">Location: </span>
						<span class="ml-1">{{ inspection.modification.location }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Executed By: </span>
						<span class="ml-1">{{ inspection.modification.executedBy }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Modification Description: </span>
						<span class="ml-1">{{
							inspection.modification.modificationDescription
						}}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Action Required: </span>
						<span class="ml-1">{{ inspection.modification.actionRequired }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Comments: </span>
						<span class="ml-1">{{ inspection.modification.comments }}</span>
					</div>
					<div class="report-item">
						<span class="font-semibold">Photos: </span>
						<span class="ml-1">{{
							inspection.modification.photos
								? inspection.modification.photos.join(", ")
								: "No photos"
						}}</span>
					</div>
				</div>
				<div v-else>
					<p>No modification entries found</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ReportDetail",
	props: {
		report: {
			type: Object,
			required: true,
		},
	},
	emits: ["close"],
	methods: {},
};
</script>

<style scoped>
.inspection-card {
	border: 1px solid #e2e8f0;
}

.report-section {
	border-bottom: 1px solid #e2e8f0;
	padding-bottom: 1rem;
}

.report-section:last-child {
	border-bottom: none;
	padding-bottom: 0;
}

.report-item {
	padding: 0.5rem;
	background-color: #f8fafc;
	border-radius: 0.375rem;
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.close-button {
	background-color: #e2e8f0;
	border-radius: 50%;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.5rem;
	cursor: pointer;
	transition: background-color 0.2s;
}

.close-button:hover {
	background-color: #cbd5e1;
}
</style>
