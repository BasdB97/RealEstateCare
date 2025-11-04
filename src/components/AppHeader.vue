<template>
	<header>
		<div class="bg-primarybg flex justify-between h-14">
			<router-link to="/">
				<img src="/src/assets/images/logo.svg" alt="RealEstateCare Logo" class="invert h-14 p-2" />
			</router-link>
			<div class="flex items-center">
				<ion-icon :icon="notifications" class="header-icon"></ion-icon>
			</div>
		</div>
	</header>
</template>

<script setup>
import { IonIcon } from "@ionic/vue";
import { notifications } from "ionicons/icons";
</script>

<style scoped>
ion-icon {
	color: #fff;
	padding-inline-end: 1rem;
	font-size: 36px;
}
ion-icon:active {
	color: #d1d5db;
	scale: 1.05;
	cursor: pointer;
	transition-property: color, background-color, border-color, outline-color, text-decoration-color,
		fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 200ms;
}
</style>
