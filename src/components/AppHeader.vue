<template>
	<header>
		<div class="bg-primarybg flex justify-between h-14">
			<router-link to="/">
				<img src="/src/assets/images/logo.svg" alt="RealEstateCare Logo" />
			</router-link>
			<div class="icon-container">
				<ion-icon :icon="notifications" class="header-icon"></ion-icon>
			</div>
		</div>
	</header>
</template>

<script setup>
import { IonIcon } from "@ionic/vue";
import { notifications } from "ionicons/icons";
</script>
