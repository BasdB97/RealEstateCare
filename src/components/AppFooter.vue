<template>
	<footer>
		<div class="bg-[#00aaa2] flex justify-evenly items-center p-2">
			<router-link to="/" class="footer-link">
				<ion-icon :icon="home"></ion-icon>
				<span>Home</span>
			</router-link>
			<router-link to="/search" class="footer-link">
				<ion-icon :icon="search"></ion-icon>
				<span>Zoeken</span>
			</router-link>
			<router-link to="/information" class="footer-link">
				<ion-icon :icon="informationCircle"></ion-icon>
				<span>Informatie</span>
			</router-link>
		</div>
	</footer>
</template>
<script setup>
import { IonIcon } from "@ionic/vue";
import { home, search, informationCircle } from "ionicons/icons";
</script>

<style scoped>
.footer-link {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-decoration: none;
	color: white;
	font-size: 14px;
	line-height: 1.4286;
	@media (width >= 640px) {
		font-size: 16px;
		line-height: 1.5;
	}
	@media (width >= 768px) {
		font-size: 20px;
		line-height: 1.4;
	}
}
.footer-link:active {
	color: #d1d5db;
	transition-property: color, background-color, border-color, outline-color, text-decoration-color,
		fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 200ms;
	scale: 1.05;
}
</style>
