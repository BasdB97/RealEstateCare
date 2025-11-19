<template>
	<BaseLayout>
		<div class="p-4 max-w-2xl mx-auto">
			<h1 class="text-3xl font-bold text-primarybg dark:text-white mb-6">Informatie</h1>

			<!-- Contact Card -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle class="text-center border-b mb-2">Contact & Support</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<div>
						<!-- Support Email -->
						<IonItem lines="none">
							<IonIcon :icon="mail" slot="start" class="text-primarybg"></IonIcon>
							<IonLabel>
								<h3 class="font-semibold">Support E-mail</h3>
								<p class="text-sm text-slate-500">support@realestatecare.nl</p>
							</IonLabel>
						</IonItem>

						<!-- Phone -->
						<IonItem lines="none">
							<IonIcon :icon="call" slot="start" class="text-primarybg"></IonIcon>
							<IonLabel>
								<h3 class="font-semibold">Telefoonnummer</h3>
								<p class="text-sm text-slate-500">+31 (0)20 123 4567</p>
							</IonLabel>
						</IonItem>

						<!-- Website -->
						<IonItem lines="none">
							<IonIcon :icon="globe" slot="start" class="text-primarybg"></IonIcon>
							<IonLabel>
								<h3 class="font-semibold">Website</h3>
								<p class="text-sm text-slate-500">www.realestatecare.nl</p>
							</IonLabel>
						</IonItem>

						<!-- Address -->
						<IonItem lines="none">
							<IonIcon :icon="location" slot="start" class="text-primarybg"></IonIcon>
							<IonLabel class="ion-text-wrap">
								<h3 class="font-semibold">Adres</h3>
								<p class="text-sm text-slate-500">
									Herengracht 450<br />
									1017 CA Amsterdam<br />
									Nederland
								</p>
							</IonLabel>
						</IonItem>
					</div>
				</IonCardContent>
			</IonCard>

			<!-- App Info Card -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle class="text-center border-b mb-2">Applicatie Informatie</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<div>
						<!-- Version Info -->
						<IonItem lines="none">
							<IonLabel>
								<h3 class="font-semibold">Versie</h3>
								<p class="text-sm text-slate-500">2.4.1 (Build 2024.11.19)</p>
							</IonLabel>
						</IonItem>

						<!-- Release Date -->
						<IonItem lines="none">
							<IonLabel>
								<h3 class="font-semibold">Release datum</h3>
								<p class="text-sm text-slate-500">19 november 2024</p>
							</IonLabel>
						</IonItem>

						<!-- Developer -->
						<IonItem lines="none">
							<IonLabel>
								<h3 class="font-semibold">Ontwikkeld door</h3>
								<p class="text-sm text-slate-500">Real Estate Care B.V.</p>
							</IonLabel>
						</IonItem>
					</div>
				</IonCardContent>
			</IonCard>

			<!-- Technical Info Card -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle class="text-center border-b mb-2">Technische Informatie</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<div>
						<!-- Platform -->
						<IonItem lines="none">
							<IonLabel>
								<h3 class="font-semibold">Platform</h3>
								<p class="text-sm text-slate-500">Ionic Framework 7.x + Vue 3</p>
							</IonLabel>
						</IonItem>
					</div>
				</IonCardContent>
			</IonCard>
			<!-- Credits -->
			<div class="text-center text-sm text-slate-500 dark:text-slate-400 mb-8">
				<p class="mt-1">Voor vragen of feedback, neem contact op met ons support team</p>
			</div>
		</div>
	</BaseLayout>
</template>

<script setup>
import {
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonLabel,
	IonIcon,
} from "@ionic/vue";
import { mail, call, globe, location } from "ionicons/icons";
</script>

<style scoped></style>
