<template>
	<IonButton :fill="fill" :size="size" :color="color" @click="goBack" class="back-button">
		<IonIcon :icon="arrowBackOutline" slot="start" />
		Terug
	</IonButton>
</template>

<script setup>
import { IonButton, IonIcon } from "@ionic/vue";
import { arrowBackOutline } from "ionicons/icons";
import { useRouter } from "vue-router";

const props = defineProps({
	fill: { type: String, default: "outline" },
	size: { type: String, default: "medium" },
	color: { type: String, default: "primary" },
});

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
