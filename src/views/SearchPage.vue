<template>
	<BaseLayout>
		<BackButton />
		<div class="p-4 max-w-2xl mx-auto">
			<h1 class="text-3xl font-bold text-primarybg dark:text-white mb-6">Zoeken</h1>
			<IonSearchbar
				placeholder="Zoek naar taken, documenten etc."
				class="dark:text-white mb-4"
				aria-label="Zoek naar taken, documenten etc."
				id="search">
			</IonSearchbar>
			<IonList class="m-2 p-2 dark:border-slate-600 rounded-lg shadow-md space-y-2">
				<IonItem lines="full">
					<IonLabel>
						<span class="font-semibold dark:text-white">Resultaten komen hier</span>
					</IonLabel>
				</IonItem>
			</IonList>
		</div>
	</BaseLayout>
</template>

<script setup>
import BackButton from "@/components/BackButton.vue";
import { IonList, IonItem, IonLabel, IonSearchbar } from "@ionic/vue";
</script>
