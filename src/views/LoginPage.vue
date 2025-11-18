<template>
	<IonPage>
		<IonContent class="ion-padding">
			<div class="flex flex-col items-center justify-center h-full max-w-md mx-auto px-4">
				<!-- Logo Section -->
				<div class="mb-8 text-center">
					<img
						src="@/assets/images/logo.svg"
						alt="Real Estate Care Logo"
						class="w-32 h-32 mx-auto mb-4" />
					<h1 class="text-3xl font-bold text-primarybg dark:text-white">Real Estate Care</h1>
					<p class="text-gray-600 dark:text-gray-400 mt-2">Welkom terug</p>
				</div>

				<!-- Login Form Card -->
				<IonCard class="w-full shadow-lg dark:shadow-2xl dark:shadow-slate-900">
					<IonCardContent class="p-6">
						<form @submit.prevent="handleLogin">
							<!-- Employee ID Input -->
							<div class="mb-4">
								<IonLabel class="block mb-2 text-sm font-medium text-primarybg dark:text-white">
									Werknemer ID
								</IonLabel>
								<IonInput
									v-model="employeeId"
									type="text"
									placeholder="Voer uw werknemer ID in"
									fill="outline"
									class="w-full"
									:class="{ 'ion-invalid': errors.employeeId }"
									@ionInput="errors.employeeId = ''"
									required />
								<p v-if="errors.employeeId" class="text-red-500 dark:text-red-400 text-xs mt-1">
									{{ errors.employeeId }}
								</p>
							</div>

							<!-- Password Input -->
							<div class="mb-6">
								<IonLabel class="block mb-2 text-sm font-medium text-primarybg dark:text-white">
									Wachtwoord
								</IonLabel>
								<IonInput
									v-model="password"
									:type="showPassword ? 'text' : 'password'"
									placeholder="Voer uw wachtwoord in"
									fill="outline"
									class="w-full"
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

				<!-- Footer Text -->
				<p class="text-xs text-gray-500 dark:text-gray-500 mt-6 text-center">
					© 2025 Real Estate Care. Alle rechten voorbehouden.
				</p>
			</div>

			<!-- Toast for feedback -->
			<IonToast
				:is-open="showToast"
				:message="toastMessage"
				:duration="3000"
				:color="toastColor"
				@didDismiss="showToast = false" />
		</IonContent>
	</IonPage>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
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
} from "@ionic/vue";
import { logInOutline, eyeOutline, eyeOffOutline } from "ionicons/icons";

const router = useRouter();

// Form data
const employeeId = ref("");
const password = ref("");
const showPassword = ref(false);

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
		// Simulate API call - Replace with actual authentication logic
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Example validation (replace with real authentication)
		if (employeeId.value === "demo" && password.value === "demo") {
			// Store authentication token/session
			localStorage.setItem("isAuthenticated", "true");
			localStorage.setItem("employeeId", employeeId.value);

			// Show success toast
			toastMessage.value = "Succesvol ingelogd!";
			toastColor.value = "success";
			showToast.value = true;

			// Navigate to home page
			setTimeout(() => {
				router.push("/");
			}, 500);
		} else {
			loginError.value = "Ongeldige werknemer ID of wachtwoord";
		}
	} catch (error) {
		console.error("Login error:", error);
		loginError.value = "Er is een fout opgetreden. Probeer het opnieuw.";
	} finally {
		isLoading.value = false;
	}
};

// Handle forgot password
const handleForgotPassword = () => {
	toastMessage.value = "Neem contact op met uw beheerder voor wachtwoordherstel";
	toastColor.value = "primary";
	showToast.value = true;
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
