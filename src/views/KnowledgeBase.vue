<template>
	<BaseLayout title="Kennisbank">
		<IonSearchbar v-model="q" placeholder="Zoek in documenten..." />
		<IonList
			v-if="filtered.length > 0"
			class="m-2 p-2 border-2 border-primarybg rounded-lg shadow-md space-y-2">
			<IonItem v-for="doc in filtered" :key="doc.id" lines="full">
				<IonLabel class="flex flex-col">
					<span class="font-semibold">{{ doc.title }}</span>
					<span class="text-sm opacity-80">{{ doc.category }} · {{ doc.version }}</span>
					<span class="text-xs opacity-70">{{ doc.description }}</span>
				</IonLabel>
				<IonButton :href="urlFor(doc.url)" target="_blank" rel="noopener" slot="end"
					>Open PDF</IonButton
				>
			</IonItem>
		</IonList>
		<div v-else class="m-2 p-2 border-2 border-primarybg rounded-lg shadow-md space-y-2">
			<p class="text-center text-slate-500">Geen documenten gevonden</p>
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
