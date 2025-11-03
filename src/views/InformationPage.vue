<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>Information</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Information</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="p-4">
				<h2 class="text-xl font-bold mb-4">Real Estate Care</h2>
				<p class="mb-2"><strong>Version:</strong> 1.0.0</p>
				<p class="mb-2"><strong>Build:</strong> 2025.11.03</p>
				<p class="mt-4">
					Deze app helpt inspecteurs bij het uitvoeren van inspecties en het maken van rapportages.
				</p>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
</script>

<style scoped></style>
