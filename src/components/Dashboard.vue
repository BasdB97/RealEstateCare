<template>
	<main
		id="dashboard"
		class="mx-auto p-4 flex justify-center items-center text-[#1d292f]">
		<div class="grid grid-cols-2 gap-6">
			<div class="flex flex-col items-center justify-center p-4">
				<ion-icon
					:icon="bookmarkOutline"
					class="text-6xl sm:text-7xl md:text-9xl font-bold" />
				<span class="text-lg sm:text-xl md:text-2xl font-bold"
					>Scheduled</span
				>
			</div>
			<div class="flex flex-col items-center justify-center p-3">
				<ion-icon
					:icon="checkmarkCircle"
					class="text-6xl sm:text-7xl md:text-9xl font-bold" />
				<span class="text-lg sm:text-xl md:text-2xl font-bold"
					>Completed</span
				>
			</div>
			<div class="flex flex-col items-center justify-center p-3">
				<ion-icon
					:icon="apps"
					class="text-6xl sm:text-7xl md:text-9xl font-bold" />
				<span class="text-lg sm:text-xl md:text-2xl font-bold"
					>Knowledge Base</span
				>
			</div>
			<div class="flex flex-col items-center justify-center p-3">
				<ion-icon
					:icon="settings"
					class="text-6xl sm:text-7xl md:text-9xl font-bold" />
				<span class="text-lg sm:text-xl md:text-2xl font-bold"
					>Settings</span
				>
			</div>
		</div>
	</main>
</template>

<script setup>
import {
	bookmarkOutline,
	checkmarkCircle,
	apps,
	settings,
} from "ionicons/icons";
</script>
