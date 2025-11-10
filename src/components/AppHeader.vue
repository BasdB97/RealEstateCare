<template>
	<header>
		<div class="bg-primarybg flex justify-between h-14">
			<router-link to="/">
				<img src="/src/assets/images/logo.svg" alt="RealEstateCare Logo" class="invert h-14 p-2" />
			</router-link>
			<IonButton @click="onReset" :disabled="busy">
				<IonIcon :icon="refresh" class="mr-2" />
				Reset database
			</IonButton>
			<div class="flex items-center">
				<ion-icon :icon="notifications" class="header-icon"></ion-icon>
			</div>
		</div>
	</header>
</template>

<script setup>
import { IonIcon, IonButton } from "@ionic/vue";
import { notifications, refresh } from "ionicons/icons";
import { ref } from "vue";
import { useReportsStore } from "@/stores/reports";

const busy = ref(false);
const store = useReportsStore();

async function onReset() {
	try {
		busy.value = true;
		await store.resetFromDbJson();
	} finally {
		busy.value = false;
	}
}
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
