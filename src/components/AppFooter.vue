<template>
	<footer>
		<div class="flex justify-evenly items-center py-2 bg-[#00aaa2] dark:bg-teal-800 text-white">
			<router-link
				to="/"
				class="flex flex-col items-center no-underline gap-0.5 text-white text-[14px] sm:text-base md:text-xl leading-[1.43] sm:leading-6 md:leading-[1.4] transition-colors duration-200 active:text-gray-300 active:scale-105">
				<ion-icon :icon="home" class="text-2xl md:text-3xl"></ion-icon>
				<span>Home</span>
			</router-link>

			<router-link
				to="/search"
				class="flex flex-col items-center no-underline gap-0.5 text-white text-[14px] sm:text-base md:text-xl leading-[1.43] sm:leading-6 md:leading-[1.4] transition-colors duration-200 active:text-gray-300 active:scale-105">
				<ion-icon :icon="search" class="text-2xl md:text-3xl"></ion-icon>
				<span>Zoeken</span>
			</router-link>

			<router-link
				to="/information"
				class="flex flex-col items-center no-underline gap-0.5 text-white text-[14px] sm:text-base md:text-xl leading-[1.43] sm:leading-6 md:leading-[1.4] transition-colors duration-200 active:text-gray-300 active:scale-105">
				<ion-icon :icon="informationCircle" class="text-2xl md:text-3xl"></ion-icon>
				<span>Informatie</span>
			</router-link>
		</div>
	</footer>
</template>

<script setup>
import { IonIcon } from "@ionic/vue";
import { home, search, informationCircle } from "ionicons/icons";
</script>
