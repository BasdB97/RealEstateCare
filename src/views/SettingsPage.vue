<template>
	<BaseLayout>
		<div class="p-4 max-w-2xl mx-auto">
			<h1 class="text-3xl font-bold text-primarybg dark:text-white mb-6">Instellingen</h1>
			<!-- Account Details Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle class="text-center border-b mb-2 dark:text-white"
						>Account Gegevens</IonCardTitle
					>
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
						<IonLabel position="stacked" class="dark:text-white">Naam</IonLabel>
						<IonInput
							type="text"
							value="John Doe"
							placeholder="Voer je naam in"
							class="dark:text-slate-400"></IonInput>
					</IonItem>

					<!-- Username -->
					<IonItem>
						<IonLabel position="stacked" class="dark:text-white">Gebruikersnaam</IonLabel>
						<IonInput
							type="text"
							value="johndoe123"
							placeholder="Voer je gebruikersnaam in"
							class="dark:text-slate-400"></IonInput>
					</IonItem>

					<IonItem>
						<IonLabel position="stacked" class="dark:text-white">Wachtwoord</IonLabel>
						<IonInput
							type="password"
							value="********"
							placeholder="Voer je wachtwoord in"
							class="dark:text-slate-400"></IonInput>
					</IonItem>

					<!-- Profession -->
					<IonItem>
						<IonLabel position="stacked" class="dark:text-white">Beroep</IonLabel>
						<IonSelect
							value="inspector"
							placeholder="Selecteer je beroep"
							class="dark:text-slate-400">
							<IonSelectOption value="inspector">Inspecteur</IonSelectOption>
							<IonSelectOption value="technician">Technicus</IonSelectOption>
							<IonSelectOption value="manager">Manager</IonSelectOption>
							<IonSelectOption value="administrator">Administrateur</IonSelectOption>
						</IonSelect>
					</IonItem>

					<!-- Email -->
					<IonItem>
						<IonLabel position="stacked" class="dark:text-white">E-mail</IonLabel>
						<IonInput
							type="email"
							value="john.doe@example.com"
							placeholder="Voer je e-mailadres in"
							class="dark:text-slate-400"></IonInput>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Interface Preferences Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle class="text-center border-b mb-2 dark:text-white"
						>Interface Voorkeuren</IonCardTitle
					>
				</IonCardHeader>
				<IonCardContent>
					<!-- Theme Toggle -->
					<IonItem>
						<IonLabel class="dark:text-white"> Donkere modus </IonLabel>
						<IonToggle
							slot="end"
							:checked="settingsStore.theme === 'dark'"
							@ionChange="settingsStore.toggleTheme()"></IonToggle>
					</IonItem>

					<IonItem>
						<IonLabel class="dark:text-white">Geluidseffecten</IonLabel>
						<IonToggle
							slot="end"
							:checked="settingsStore.soundEnabled"
							@ionChange="settingsStore.setSoundEnabled($event.target.checked)"></IonToggle>
					</IonItem>

					<IonItem>
						<IonLabel class="dark:text-white">Push meldingen</IonLabel>
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
			<IonButton expand="block" @click="onSave" :disabled="isSaving" class="mt-4 mb-4">
				{{ isSaving ? "Opslaan..." : "Instellingen opslaan" }}
				<IonSpinner v-if="isSaving" name="crescent" />
			</IonButton>

			<!-- Log out Button -->
			<IonButton expand="block" color="danger" @click="handleLogout" class="mt-4 mb-4">
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
				:color="toastColor"
				:duration="3000"
				position="top"
				@didDismiss="showToast = false"></IonToast>
		</div>
	</BaseLayout>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "@/stores/settings";
import { useReportsStore } from "@/stores/reports";
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";

import {
	IonCard,
	IonIcon,
	IonSpinner,
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
	IonAccordionGroup,
	IonAccordion,
} from "@ionic/vue";
import { save, refresh, camera, logOutOutline } from "ionicons/icons";

const settingsStore = useSettingsStore();
const reportsStore = useReportsStore();
const loginStore = useLoginStore();
const router = useRouter();

// Toast state
const showToast = ref(false);
const toastMessage = ref("");
const toastColor = ref("success");
const isSaving = ref(false);

// Helper function for toast
const showToastMessage = (message, color = "success") => {
	toastMessage.value = message;
	toastColor.value = color;
	showToast.value = true;
};

const onSave = async () => {
	isSaving.value = true;

	// Simuleer een korte vertraging voor visuele feedback
	await new Promise((resolve) => setTimeout(resolve, 500));

	settingsStore.saveSettings();
	showToastMessage("Instellingen succesvol opgeslagen!");

	isSaving.value = false;
};

const onResetDatabase = async () => {
	try {
		await reportsStore.resetDatabase();
		showToastMessage("Database succesvol gereset!", "success");
	} catch (e) {
		showToastMessage("Fout bij resetten van de database: " + e.message, "danger");
	}
};

const handleLogout = () => {
	loginStore.logout();
	router.push("/login");
};
</script>

<style scoped></style>
