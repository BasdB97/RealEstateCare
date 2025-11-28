<template>
	<BaseLayout>
		<BackButton to="/home" />
		<h1 class="page-title">Kennisbank</h1>
		<div v-if="error" class="text-center text-red-600 dark:text-red-400 p-4">
			<p class="mb-2">{{ error }}</p>
			<IonButton
				aria-label="Opnieuw proberen kennisbank te laden"
				size="small"
				@click="knowledgeBaseStore.fetchKnowledgeBase()"
				>Opnieuw proberen</IonButton
			>
		</div>
		<div v-else-if="knowledgeBase.length > 0">
			<IonSearchbar aria-label="Zoek in documenten..." placeholder="Zoek in documenten..." />
			<IonList
				class="m-2 p-2 border-2 border-primarybg dark:border-slate-600 rounded-lg shadow-md space-y-2">
				<IonItem
					:aria-label="`Document: ${doc.title}`"
					v-for="doc in knowledgeBase"
					:key="doc.id"
					lines="full">
					<IonLabel>
						<span class="font-semibold dark:text-white">{{ doc.title }}</span>
						<br />
						<span class="text-sm opacity-80 dark:text-slate-300"
							>{{ doc.category }} · {{ doc.version }}</span
						>
						<br />
						<span class="text-xs opacity-70 dark:text-slate-400">{{ doc.description }}</span>
					</IonLabel>
					<IonButton
						:aria-label="`Document ${doc.title} openen in een nieuw tabblad`"
						:href="urlFor(doc.url)"
						target="_blank"
						rel="noopener"
						slot="end"
						>Open PDF</IonButton
					>
				</IonItem>
			</IonList>
		</div>
		<div
			v-else
			class="m-2 p-2 border-2 border-primarybg dark:border-slate-600 rounded-lg shadow-md space-y-2">
			<p class="text-center text-slate-500 dark:text-slate-400">
				Geen documenten gevonden. Probeer het later opnieuw.
			</p>
		</div>
	</BaseLayout>
</template>

<script setup>
import BackButton from "@/components/BackButton.vue";

import { onMounted } from "vue";
import { IonList, IonItem, IonLabel, IonButton, IonSearchbar } from "@ionic/vue";
import { useKnowledgeBaseStore } from "@/stores/knowledgebase";
import { storeToRefs } from "pinia";

const knowledgeBaseStore = useKnowledgeBaseStore();
const { error, knowledgeBase } = storeToRefs(knowledgeBaseStore);

// Haal de documenten op bij het laden van de pagina
onMounted(async () => await knowledgeBaseStore.fetchKnowledgeBase());

// functie om de URL voor het openen van het PDF te bepalen
const urlFor = (u) =>
	u.startsWith("http")
		? u
		: import.meta.env.BASE_URL.replace(/\/$/, "") + (u.startsWith("/") ? u : "/" + u);
</script>
