<template>
	<IonButton
		aria-label="Terug naar de vorige pagina"
		fill="outline"
		size="medium"
		color="primary"
		@click="goBack"
		class="back-button">
		<IonIcon :icon="arrowBackOutline" slot="start" />
		Terug
	</IonButton>
</template>

<script setup>
import { IonButton, IonIcon } from "@ionic/vue";
import { arrowBackOutline } from "ionicons/icons";
import { useRouter } from "vue-router";

const props = defineProps({
	to: { type: String, default: "/" },
});

const router = useRouter();

const goBack = () => {
	if (props.to) {
		router.push(props.to);
	} else {
		router.back();
	}
};
</script>

<style scoped>
.back-button {
	text-transform: none;
	--border-radius: 8px;
}
</style>
