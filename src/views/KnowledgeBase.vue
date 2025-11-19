<template>
	<BaseLayout title="Kennisbank">
		<h1 class="text-3xl px-4 pt-4 font-bold text-primarybg dark:text-white">Kennisbank</h1>
		<div v-if="loading" class="flex justify-center items-center h-64">
			<IonSpinner name="circles" />
		</div>
		<IonSearchbar v-model="q" placeholder="Zoek in documenten..." />
		<IonList
			v-if="filtered.length > 0"
			class="m-2 p-2 border-2 border-primarybg dark:border-slate-600 rounded-lg shadow-md space-y-2">
			<IonItem v-for="doc in filtered" :key="doc.id" lines="full">
				<IonLabel class="flex flex-col">
					<span class="font-semibold dark:text-slate-100">{{ doc.title }}</span>
					<span class="text-sm opacity-80 dark:text-slate-300"
						>{{ doc.category }} · {{ doc.version }}</span
					>
					<span class="text-xs opacity-70 dark:text-slate-400">{{ doc.description }}</span>
				</IonLabel>
				<IonButton :href="urlFor(doc.url)" target="_blank" rel="noopener" slot="end"
					>Open PDF</IonButton
				>
			</IonItem>
		</IonList>
		<div
			v-else
			class="m-2 p-2 border-2 border-primarybg dark:border-slate-600 rounded-lg shadow-md space-y-2">
			<p class="text-center text-slate-500 dark:text-slate-400">Geen documenten gevonden</p>
		</div>
	</BaseLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { IonList, IonItem, IonLabel, IonButton, IonSearchbar } from "@ionic/vue";
import { useReportsStore } from "@/stores/reports";

const store = useReportsStore();
const q = ref("");
onMounted(async () => await store.fetchKnowledgeBase());
const filtered = computed(() => (q.value ? store.search(q.value) : store.knowledgeBase));

const urlFor = (u) =>
	u.startsWith("http")
		? u
		: import.meta.env.BASE_URL.replace(/\/$/, "") + (u.startsWith("/") ? u : "/" + u);
</script>
