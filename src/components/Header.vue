<template>
	<header class="bg-[#161d21] mx-auto">
		<div>
			<div class="bg-[#00aaa2] flex justify-end gap-2 p-2 text-[#61cbc6]">
				<ion-icon id="iconbar-square" :icon="square"></ion-icon>
				<ion-icon id="iconbar-ellipse" :icon="ellipse"></ion-icon>
				<ion-icon id="iconbar-triangle" :icon="triangle"></ion-icon>
			</div>
		</div>
		<div class="flex justify-between items-center p-4">
			<div class="flex items-center">
				<img
					class="logo"
					src="@/assets/logo.svg"
					alt="logo"
					style="filter: invert(100%); width: 250px" />
			</div>
			<div class="flex items-center gap-4">
				<ion-icon :icon="notifications" class="text-white text-2xl" />
				<ion-icon :icon="settings" class="text-white text-2xl" />
			</div>
		</div>
	</header>
</template>
<script setup>
import { square, ellipse, triangle, notifications, settings } from "ionicons/icons";
</script>
