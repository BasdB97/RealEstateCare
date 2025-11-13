<template>
	<BaseLayout>
		<div class="p-4 max-w-2xl mx-auto">
			<h1 class="text-3xl font-bold text-primarybg dark:text-white mb-6">Instellingen</h1>

			<!-- Account Details Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle>Account Gegevens</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<!-- Avatar Section -->
					<div class="flex items-center mb-6">
						<div class="relative">
							<div
								class="w-24 h-24 rounded-full bg-primarybg flex items-center justify-center text-white text-3xl font-bold">
								{{ avatarInitials }}
							</div>
							<IonButton size="small" class="absolute bottom-0 right-0" @click="changeAvatar">
								<ion-icon :icon="camera" slot="icon-only"></ion-icon>
							</IonButton>
						</div>
						<div class="ml-4">
							<p class="text-sm text-slate-500">Klik op de camera om je avatar te wijzigen</p>
						</div>
					</div>

					<!-- Name -->
					<IonItem>
						<IonLabel position="stacked">Naam</IonLabel>
						<IonInput v-model="store.name" type="text" placeholder="Voer je naam in"></IonInput>
					</IonItem>

					<!-- Username -->
					<IonItem>
						<IonLabel position="stacked">Gebruikersnaam</IonLabel>
						<IonInput
							v-model="store.username"
							type="text"
							placeholder="Voer je gebruikersnaam in"
							@ionChange="markDirty"></IonInput>
					</IonItem>

					<!-- Profession -->
					<IonItem>
						<IonLabel position="stacked">Beroep</IonLabel>
						<IonSelect
							v-model="store.profession"
							placeholder="Selecteer je beroep"
							@ionChange="markDirty">
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
							v-model="store.email"
							type="email"
							placeholder="Voer je e-mailadres in"
							@ionChange="markDirty"></IonInput>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Security Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle>Beveiliging</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<IonItem button @click="openPasswordModal">
						<ion-icon :icon="lockClosed" slot="start"></ion-icon>
						<IonLabel>
							<h3>Wachtwoord wijzigen</h3>
							<p>Verander je wachtwoord</p>
						</IonLabel>
						<ion-icon :icon="chevronForward" slot="end"></ion-icon>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Interface Preferences Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle>Interface Voorkeuren</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<!-- Theme Toggle -->
					<IonItem>
						<ion-icon :icon="store.isDarkMode ? moon : sunny" slot="start"></ion-icon>
						<IonLabel>
							<h3>Donkere modus</h3>
							<p>Schakel tussen licht en donker thema</p>
						</IonLabel>
						<!-- Let op: boolean toggle -->
						<IonToggle :checked="store.isDarkMode" @ionChange="toggleDark()"></IonToggle>
						<p>{{ isDark }}</p>
					</IonItem>

					<!-- Language Selection -->
					<IonItem>
						<ion-icon :icon="language" slot="start"></ion-icon>
						<IonLabel position="stacked">Taal</IonLabel>
						<IonSelect v-model="store.language" placeholder="Selecteer taal" @ionChange="markDirty">
							<IonSelectOption value="nl">Nederlands</IonSelectOption>
							<IonSelectOption value="en">English</IonSelectOption>
							<IonSelectOption value="de">Deutsch</IonSelectOption>
							<IonSelectOption value="fr">Français</IonSelectOption>
						</IonSelect>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Notifications Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle>Meldingen</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<!-- Push Notifications -->
					<IonItem>
						<ion-icon :icon="notifications" slot="start"></ion-icon>
						<IonLabel>
							<h3>Push meldingen</h3>
							<p>Ontvang meldingen op je apparaat</p>
						</IonLabel>
						<IonToggle v-model="store.notifications.push" @ionChange="markDirty"></IonToggle>
					</IonItem>

					<!-- Email Notifications -->
					<IonItem>
						<ion-icon :icon="mail" slot="start"></ion-icon>
						<IonLabel>
							<h3>E-mail meldingen</h3>
							<p>Ontvang meldingen via e-mail</p>
						</IonLabel>
						<IonToggle v-model="store.notifications.email" @ionChange="markDirty"></IonToggle>
					</IonItem>

					<!-- Sound Effects -->
					<IonItem>
						<ion-icon :icon="store.sound ? volumeHigh : volumeMute" slot="start"></ion-icon>
						<IonLabel>
							<h3>Geluidseffecten</h3>
							<p>Speel geluid af bij acties en meldingen</p>
						</IonLabel>
						<IonToggle v-model="store.sound" @ionChange="markDirty"></IonToggle>
					</IonItem>

					<!-- Vibration -->
					<IonItem>
						<ion-icon :icon="phonePortraitOutline" slot="start"></ion-icon>
						<IonLabel>
							<h3>Trillen</h3>
							<p>Apparaat trilt bij meldingen</p>
						</IonLabel>
						<IonToggle v-model="store.vibration" @ionChange="markDirty"></IonToggle>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Data & Privacy Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle>Data & Privacy</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<IonItem button @click="clearCache">
						<ion-icon :icon="trash" slot="start"></ion-icon>
						<IonLabel>
							<h3>Cache wissen</h3>
							<p>Verwijder lokaal opgeslagen gegevens</p>
						</IonLabel>
					</IonItem>

					<IonItem button>
						<ion-icon :icon="document" slot="start"></ion-icon>
						<IonLabel>
							<h3>Privacybeleid</h3>
							<p>Lees ons privacybeleid</p>
						</IonLabel>
						<ion-icon :icon="chevronForward" slot="end"></ion-icon>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Save Button -->
			<IonButton expand="block" @click="saveAll" class="mt-4 mb-4">
				<ion-icon :icon="save" slot="start"></ion-icon>
				Instellingen opslaan
			</IonButton>

			<!-- Password Change Modal -->
			<IonModal :is-open="showPasswordModal" @didDismiss="closePasswordModal">
				<IonHeader>
					<IonToolbar>
						<IonTitle>Wachtwoord wijzigen</IonTitle>
						<IonButtons slot="end">
							<IonButton @click="closePasswordModal">Sluiten</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent class="ion-padding">
					<IonItem>
						<IonLabel position="stacked">Huidig wachtwoord</IonLabel>
						<IonInput
							v-model="passwordForm.current"
							type="password"
							placeholder="Voer huidig wachtwoord in"></IonInput>
					</IonItem>

					<IonItem>
						<IonLabel position="stacked">Nieuw wachtwoord</IonLabel>
						<IonInput
							v-model="passwordForm.new"
							type="password"
							placeholder="Voer nieuw wachtwoord in"></IonInput>
					</IonItem>

					<IonItem>
						<IonLabel position="stacked">Bevestig nieuw wachtwoord</IonLabel>
						<IonInput
							v-model="passwordForm.confirm"
							type="password"
							placeholder="Bevestig nieuw wachtwoord"></IonInput>
					</IonItem>

					<IonButton expand="block" @click="changePassword" class="mt-4">
						<ion-icon :icon="checkmark" slot="start"></ion-icon>
						Wachtwoord wijzigen
					</IonButton>
				</IonContent>
			</IonModal>

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
import { useDark, useToggle } from "@vueuse/core";
import { useSettingsStore } from "@/stores/settings";
import {
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardContent,
	IonItem,
	IonLabel,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonToggle,
	IonButton,
	IonModal,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonButtons,
	IonContent,
	IonToast,
} from "@ionic/vue";
import {
	camera,
	lockClosed,
	chevronForward,
	moon,
	sunny,
	language,
	notifications,
	mail,
	volumeHigh,
	volumeMute,
	phonePortraitOutline,
	trash,
	document,
	save,
	checkmark,
} from "ionicons/icons";

const store = useSettingsStore();

const isDark = useDark();
const toggleDark = useToggle(isDark);

console.log(isDark);
console.log(toggleDark);

// lokale UI-states
const showPasswordModal = ref(false);
const passwordForm = ref({ current: "", new: "", confirm: "" });
const showToast = ref(false);
const toastMessage = ref("");

// Mark settings as modified
const markDirty = () => {
	isDirty.value = true;
};

// helpers
const showToastMessage = (m) => {
	toastMessage.value = m;
	showToast.value = true;
};

const changeAvatar = () => showToastMessage("Avatar wijzigen functionaliteit komt binnenkort!");
const openPasswordModal = () => (showPasswordModal.value = true);
const closePasswordModal = () => {
	showPasswordModal.value = false;
	passwordForm.value = { current: "", new: "", confirm: "" };
};

const changePassword = () => {
	const { current, new: nw, confirm } = passwordForm.value;
	if (!current || !nw || !confirm) return showToastMessage("Vul alle velden in");
	if (nw !== confirm) return showToastMessage("Nieuwe wachtwoorden komen niet overeen");
	if (nw.length < 8) return showToastMessage("Wachtwoord moet minimaal 8 tekens bevatten");
	showToastMessage("Wachtwoord succesvol gewijzigd!");
	closePasswordModal();
};

const saveAll = () => {
	store.saveSettings();
	showToastMessage("Instellingen succesvol opgeslagen!");
};

const clearCache = () => {
	store.clearCache();
	showToastMessage("Cache gewist!");
};
</script>

<style scoped>
.dark ion-card {
	background: var(--ion-color-step-50);
}
</style>
