<!-- BaseLayout.vue -->
<template>
	<IonPage>
		<AppHeader />
		<IonContent>
			<div
				v-if="reportsStore.loading"
				class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
				<IonSpinner name="circles" />
			</div>
			<slot />
		</IonContent>
		<AppFooter />
	</IonPage>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import { IonPage, IonContent, IonSpinner } from "@ionic/vue";
import { useReportsStore } from "@/stores/reports";

const reportsStore = useReportsStore();
</script>
