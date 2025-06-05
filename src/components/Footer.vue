<template>
	<footer
		class="bg-[#00aaa2] w-full flex items-center justify-evenly fixed bottom-0 py-2">
		<div class="flex flex-col items-center">
			<ion-icon
				:icon="build"
				class="text-white text-xl sm:text-2xl md:text-3xl" />
			<span class="text-white text-sm sm:text-base md:text-xl"
				>Active task</span
			>
		</div>
		<div class="flex flex-col items-center">
			<ion-icon
				:icon="searchOutline"
				class="text-white text-xl sm:text-2xl md:text-3xl" />
			<span class="text-white text-sm sm:text-base md:text-xl"
				>Search</span
			>
		</div>
		<div class="flex flex-col items-center">
			<ion-icon
				:icon="alertCircle"
				class="text-white text-xl sm:text-2xl md:text-3xl" />
			<span class="text-white text-sm sm:text-base md:text-xl"
				>Information</span
			>
		</div>
	</footer>
</template>

<script setup>
import { alertCircle, build, searchOutline } from "ionicons/icons";
</script>
