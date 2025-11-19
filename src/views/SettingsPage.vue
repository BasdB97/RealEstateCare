<template>
	<BaseLayout>
		<div class="p-4 max-w-2xl mx-auto">
			<h1 class="text-3xl font-bold text-primarybg dark:text-white mb-6">Instellingen</h1>

			<!-- Interface Preferences Section -->
			<IonCard class="mb-4">
				<IonCardHeader>
					<IonCardTitle>Interface Voorkeuren</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					<!-- Theme Toggle -->
					<IonItem>
						<ion-icon :icon="store.theme === 'dark' ? moon : sunny" slot="start"></ion-icon>
						<IonLabel>
							<h3>Donkere modus</h3>
							<p>Schakel tussen licht en donker thema</p>
						</IonLabel>
						<!-- Gebruik store.theme in plaats van isDark -->
						<IonToggle
							:checked="store.theme === 'dark'"
							@ionChange="store.toggleTheme()"></IonToggle>
					</IonItem>
				</IonCardContent>
			</IonCard>

			<!-- Save Button -->
			<IonButton expand="block" @click="saveAll" class="mt-4 mb-4">
				<ion-icon :icon="save" slot="start"></ion-icon>
				Instellingen opslaan
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
} from "@ionic/vue";
import { moon, sunny, save } from "ionicons/icons";

const store = useSettingsStore();

// lokale UI-states
const showToast = ref(false);
const toastMessage = ref("");

// helpers
const showToastMessage = (m) => {
	toastMessage.value = m;
	showToast.value = true;
};

const saveAll = () => {
	store.saveSettings();
	showToastMessage("Instellingen succesvol opgeslagen!");
};
</script>

<style scoped>
.dark ion-card {
	background: var(--ion-color-step-50);
}
</style>
