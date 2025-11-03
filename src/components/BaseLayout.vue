<template>
	<ion-page>
		<AppHeader />
		<ion-content>
			<slot />
		</ion-content>
		<AppFooter />
	</ion-page>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { IonPage, IonContent } from "@ionic/vue";
</script>
