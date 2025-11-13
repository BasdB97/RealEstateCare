<template>
	<IonPage>
		<AppHeader />
		<IonContent>
			<slot />
		</IonContent>
		<AppFooter />
	</IonPage>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { IonPage, IonContent } from "@ionic/vue";
</script>
