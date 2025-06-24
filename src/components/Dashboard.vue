<template>
	<div
		id="dashboard"
		class="mx-auto p-4 flex flex-col justify-center items-center text-[#1d292f] overflow-y-auto max-h-[calc(100vh-12rem)]">
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
		<InspectionsList />
	</div>
</template>

<script setup>
import { bookmarkOutline, checkmarkCircle, apps, settings } from "ionicons/icons";
import InspectionsList from "./InspectionsList.vue";
</script>
