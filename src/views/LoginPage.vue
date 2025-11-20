<template>
	<IonPage>
		<IonContent class="ion-padding">
			<div class="flex flex-col items-center justify-center h-full max-w-md mx-auto px-4">
				<!-- Logo Section -->
				<div class="mb-2 text-center">
					<img
						src="@/assets/images/logo.svg"
						alt="Real Estate Care Logo"
						class="w-48 mb-4 mx-auto" />
					<h3 class="text-gray-600 dark:text-gray-400 mt-2">Welkom terug</h3>
				</div>

				<!-- Login Form Card -->
				<IonCard class="w-full shadow-lg dark:shadow-2xl dark:shadow-slate-900">
					<IonCardContent class="p-6">
						<form @submit.prevent="handleLogin">
							<!-- Employee ID Input -->
							<div class="mb-4">
								<IonLabel class="block text-lg font-medium text-primarybg dark:text-white">
									Werknemer ID
								</IonLabel>
								<IonInput
									v-model="employeeId"
									type="text"
									placeholder="Voer uw werknemer ID in"
									fill="outline"
									class="w-full text-lg dark:text-gray-400 dark:focus-within:text-white"
									:class="{ 'ion-invalid': errors.employeeId }"
									@ionInput="errors.employeeId = ''"
									required />
								<p v-if="errors.employeeId" class="text-red-500 dark:text-red-400 text-xs mt-1">
									{{ errors.employeeId }}
								</p>
							</div>

							<!-- Password Input -->
							<div class="mb-6">
								<IonLabel class="block text-lg font-medium text-primarybg dark:text-white">
									Wachtwoord
								</IonLabel>
								<IonInput
									v-model="password"
									:type="showPassword ? 'text' : 'password'"
									placeholder="Voer uw wachtwoord in"
									fill="outline"
									class="w-full text-lg dark:text-gray-400 dark:focus-within:text-white"
									:class="{ 'ion-invalid': errors.password }"
									@ionInput="errors.password = ''"
									required>
									<IonIcon
										slot="end"
										:icon="showPassword ? eyeOffOutline : eyeOutline"
										@click="showPassword = !showPassword"
										class="cursor-pointer text-gray-500 dark:text-gray-400 mr-2" />
								</IonInput>
								<p v-if="errors.password" class="text-red-500 dark:text-red-400 text-xs mt-1">
									{{ errors.password }}
								</p>
							</div>

							<!-- Login Error Message -->
							<IonText v-if="loginError" color="danger" class="block mb-4 text-sm">
								<p class="text-center">{{ loginError }}</p>
							</IonText>

							<!-- Login Button -->
							<IonButton expand="block" type="submit" :disabled="isLoading" class="mb-3">
								<IonIcon v-if="!isLoading" :icon="logInOutline" slot="start" />
								<IonSpinner v-if="isLoading" name="crescent" slot="start" />
								{{ isLoading ? "Inloggen..." : "Inloggen" }}
							</IonButton>

							<!-- Forgot Password Link -->
							<div class="text-center">
								<a
									href="#"
									class="text-sm text-blue-600 dark:text-blue-400 hover:underline"
									@click.prevent="handleForgotPassword">
									Wachtwoord vergeten?
								</a>
							</div>
						</form>
					</IonCardContent>
				</IonCard>
			</div>

			<!-- Toast for feedback -->
			<IonToast
				:is-open="showToast"
				:message="toastMessage"
				:duration="3000"
				:color="toastColor"
				@didDismiss="showToast = false" />

			<IonModal :is-open="showAuthModal" @didDismiss="closeAuthModal">
				<IonCard class="mx-4 my-10">
					<IonCardContent>
						<IonLabel class="block mb-2 font-semibold">Authenticatie</IonLabel>
						<IonText class="block mb-2 text-l text-gray-600 dark:text-gray-300">
							Voer de 6-cijferige code in ter bevestiging:
						</IonText>

						<div class="my-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
							<IonText class="block text-sm text-gray-600 dark:text-gray-300 mb-1">
								Uw authenticatiecode:
							</IonText>
							<IonText class="block text-3xl font-bold text-blue-600 dark:text-blue-400">
								{{ displayedAuthCode }}
							</IonText>
						</div>

						<IonInput
							mode="md"
							label="Code"
							placeholder="Code is te vinden in de console"
							maxlength="6"
							inputmode="numeric"
							:clear-input="true"
							class="mb-2"
							v-model="authCode"
							@keyup.enter="checkAuthCode" />
						<IonText v-if="authError" color="danger" class="block text-xs mb-2">{{
							authError
						}}</IonText>
						<IonButton expand="block" @click="checkAuthCode"> Bevestigen </IonButton>
						<IonButton
							expand="block"
							fill="clear"
							color="medium"
							class="mt-2"
							@click="closeAuthModal">
							Annuleren
						</IonButton>
					</IonCardContent>
				</IonCard>
			</IonModal>
		</IonContent>
	</IonPage>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useLoginStore } from "@/stores/login";

import {
	IonPage,
	IonContent,
	IonCard,
	IonCardContent,
	IonInput,
	IonLabel,
	IonButton,
	IonIcon,
	IonText,
	IonSpinner,
	IonToast,
	IonModal,
} from "@ionic/vue";
import { logInOutline, eyeOutline, eyeOffOutline } from "ionicons/icons";

const router = useRouter();

const loginStore = useLoginStore();

// Form data
const employeeId = ref("");
const password = ref("");
const showPassword = ref(false);
const showAuthModal = ref(false);
const authCode = ref("");
const authError = ref("");
const displayedAuthCode = ref("");

// UI states
const isLoading = ref(false);
const loginError = ref("");
const errors = ref({
	employeeId: "",
	password: "",
});

// Toast
const showToast = ref(false);
const toastMessage = ref("");
const toastColor = ref("success");

// Validation
const validateForm = () => {
	let isValid = true;
	errors.value = { employeeId: "", password: "" };

	if (!employeeId.value.trim()) {
		errors.value.employeeId = "Werknemer ID is verplicht";
		isValid = false;
	}

	if (!password.value.trim()) {
		errors.value.password = "Wachtwoord is verplicht";
		isValid = false;
	} else if (password.value.length < 4) {
		errors.value.password = "Wachtwoord moet minimaal 4 tekens bevatten";
		isValid = false;
	}

	return isValid;
};

// Handle login
const handleLogin = async () => {
	loginError.value = "";

	if (!validateForm()) {
		return;
	}

	isLoading.value = true;

	try {
		const randomNumber = await loginStore.login(employeeId.value, password.value);
		// Als we hier komen, was de login succesvol
		displayedAuthCode.value = randomNumber.toString(); // TOEVOEGEN: sla de code op
		showAuthModal.value = true;
	} catch (error) {
		console.error("Login error:", error);
		loginError.value = "Onjuiste inloggegevens. Controleer uw werknemer ID en wachtwoord.";
	} finally {
		isLoading.value = false;
	}
};

// Handle forgot password
const handleForgotPassword = () => {
	toastMessage.value = "Deze functionaliteit is momenteel nog niet beschikbaar.";
	toastColor.value = "primary";
	showToast.value = true;
};

const closeAuthModal = () => {
	showAuthModal.value = false;
	authCode.value = "";
	authError.value = "";
	displayedAuthCode.value = "";
};

const checkAuthCode = async () => {
	const randomNumber = localStorage.getItem("randomNumber");
	if (authCode.value === randomNumber) {
		showAuthModal.value = false;
		toastMessage.value = "Welkom, " + loginStore.employeeName + "!";
		toastColor.value = "success";
		showToast.value = true;
		router.push("/");
	} else {
		authError.value = "Ongeldige code";
	}
};
</script>

<style scoped>
ion-card {
	--background: var(--ion-item-background);
	border-radius: 1rem;
}

ion-input {
	--padding-start: 12px;
	--padding-end: 12px;
	--padding-top: 10px;
	--padding-bottom: 10px;
	--border-radius: 8px;
	--background: var(--ion-item-background);
}

ion-input.ion-invalid {
	--border-color: #ef4444;
}

ion-button {
	--border-radius: 8px;
	font-weight: 600;
	text-transform: none;
	letter-spacing: 0.5px;
}

.dark ion-card {
	background: var(--ion-card-background);
}
</style>
