<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>Search</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Search</ion-title>
				</ion-toolbar>
			</ion-header>

			<div class="p-4">
				<p>Hier komt de zoekfunctionaliteit.</p>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/vue";
</script>

<style scoped></style>
