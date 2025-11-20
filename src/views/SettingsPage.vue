<template>
	<BaseLayout>
		<div class="p-4 max-w-2xl mx-auto">
			<h1 class="text-3xl font-bold text-primarybg dark:text-white mb-6">Instellingen</h1>

			<!-- Account Details Section -->
			<!-- Account Details Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle class="text-center border-b mb-2">Account Gegevens</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<!-- Avatar Section -->
					<div class="flex items-center mb-6">
						<div class="relative">
							<div
								class="w-24 h-24 rounded-full bg-primarybg flex items-center justify-center text-white text-3xl font-bold"></div>
							<IonButton size="small" class="absolute bottom-0 right-0">
								<IonIcon :icon="camera" slot="icon-only"></IonIcon>
							</IonButton>
						</div>
						<div class="ml-4">
							<p class="text-sm text-slate-500">Klik op de camera om je avatar te wijzigen</p>
						</div>
					</div>

					<!-- Name -->
					<IonItem>
						<IonLabel position="stacked">Naam</IonLabel>
						<IonInput type="text" value="John Doe" placeholder="Voer je naam in"></IonInput>
					</IonItem>

					<!-- Username -->
					<IonItem>
						<IonLabel position="stacked">Gebruikersnaam</IonLabel>
						<IonInput
							type="text"
							value="johndoe123"
							placeholder="Voer je gebruikersnaam in"></IonInput>
					</IonItem>

					<IonItem>
						<IonLabel position="stacked">Wachtwoord</IonLabel>
						<IonInput
							type="password"
							value="********"
							placeholder="Voer je wachtwoord in"></IonInput>
					</IonItem>

					<!-- Profession -->
					<IonItem>
						<IonLabel position="stacked">Beroep</IonLabel>
						<IonSelect value="inspector" placeholder="Selecteer je beroep">
							<IonSelectOption value="inspector">Inspecteur</IonSelectOption>
							<IonSelectOption value="technician">Technicus</IonSelectOption>
							<IonSelectOption value="manager">Manager</IonSelectOption>
							<IonSelectOption value="administrator">Administrateur</IonSelectOption>
						</IonSelect>
					</IonItem>

					<!-- Email -->
					<IonItem>
						<IonLabel position="stacked">E-mail</IonLabel>
						<IonInput
							type="email"
							value="john.doe@example.com"
							placeholder="Voer je e-mailadres in"></IonInput>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Interface Preferences Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle class="text-center border-b mb-2">Interface Voorkeuren</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<!-- Theme Toggle -->
					<IonItem>
						<IonIcon :icon="settingsStore.theme === 'dark' ? moon : sunny" slot="start"></IonIcon>
						<IonLabel>
							<h3>Donkere modus</h3>
							<p>Schakel tussen licht en donker thema</p>
						</IonLabel>
						<IonToggle
							slot="end"
							:checked="settingsStore.theme === 'dark'"
							@ionChange="settingsStore.toggleTheme()"></IonToggle>
					</IonItem>

					<IonItem>
						<IonIcon :icon="volumeHigh" slot="start"></IonIcon>
						<IonLabel>Geluidseffecten</IonLabel>
						<IonToggle
							slot="end"
							:checked="settingsStore.soundEnabled"
							@ionChange="settingsStore.setSoundEnabled($event.target.checked)"></IonToggle>
					</IonItem>

					<IonItem>
						<IonIcon :icon="phonePortraitOutline" slot="start"></IonIcon>
						<IonLabel>Push meldingen</IonLabel>
						<IonToggle
							slot="end"
							:checked="settingsStore.pushNotificationsEnabled"
							@ionChange="
								settingsStore.setPushNotificationsEnabled($event.target.checked)
							"></IonToggle>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Save Button -->
			<IonButton expand="block" @click="onSave" class="mt-4 mb-4">
				<IonIcon :icon="save" slot="start"></IonIcon>
				Instellingen opslaan
			</IonButton>

			<!-- Log out Button -->
			<IonButton expand="block" color="danger" @click="onLogOut" class="mt-4 mb-4">
				<IonIcon :icon="logOutOutline" slot="start"></IonIcon>
				Uitloggen
			</IonButton>

			<IonButton @click="onResetDatabase" :disabled="reportsStore.loading">
				<IonIcon :icon="refresh" class="mr-2" />
				Reset database
			</IonButton>

			<!-- Toast for feedback -->
			<IonToast
				:is-open="showToast"
				:message="toastMessage"
				:duration="3000"
				@didDismiss="showToast = false"></IonToast>
		</div>
	</BaseLayout>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useReportsStore } from "@/stores/reports";
import {
	IonCard,
	IonIcon,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonLabel,
	IonToggle,
	IonButton,
	IonToast,
	IonInput,
	IonSelect,
	IonSelectOption,
} from "@ionic/vue";
import {
	moon,
	sunny,
	save,
	refresh,
	camera,
	volumeHigh,
	phonePortraitOutline,
	logOutOutline,
} from "ionicons/icons";

const settingsStore = useSettingsStore();
const reportsStore = useReportsStore();

// lokale UI-states
const showToast = ref(false);
const toastMessage = ref("");

// helpers
const showToastMessage = (m) => {
	toastMessage.value = m;
	showToast.value = true;
};

const onSave = () => {
	settingsStore.saveSettings();
	showToastMessage("Instellingen succesvol opgeslagen!");
};

const onResetDatabase = async () => {
	try {
		await reportsStore.resetDatabase();
		showToastMessage("Database succesvol gereset!");
	} catch (e) {
		showToastMessage("Fout bij resetten van de database: " + e.message);
	}
};
</script>

<style scoped></style>
