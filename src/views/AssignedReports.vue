<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>Assigned Reports</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Assigned Reports</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="p-4">
				<p>Hier komen de toegewezen rapportages voor de inspecteur.</p>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
</script>

<style scoped></style>
