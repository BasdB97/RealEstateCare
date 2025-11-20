<template>
	<IonButton :fill="outline" :size="default" :color="primary" @click="goBack" class="back-button">
		<IonIcon :icon="arrowBackOutline" slot="start" />
		Terug
	</IonButton>
</template>

<script setup>
import { IonButton, IonIcon } from "@ionic/vue";
import { arrowBackOutline } from "ionicons/icons";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
	router.back(); // Ga terug in de browser history
};
</script>

<style scoped>
.back-button {
	text-transform: none;
	--border-radius: 8px;
}
</style>
