<template>
	<IonList class="p-4">
		<IonItem class="flex justify-between items-center">
			<IonLabel>Locatie</IonLabel>
			<IonInput v-model="inspection.location" class="text-right w-1/2" />
		</IonItem>

		<IonItem class="flex justify-between items-center">
			<IonLabel>Nieuwe schade?</IonLabel>
			<IonCheckbox v-model="inspection.newDamage" slot="end" :value="inspection.newDamage" />
		</IonItem>

		<IonItem class="flex justify-between items-center">
			<IonSelect
				v-model="inspection.damageType"
				label="Soort schade"
				labelPlacement="fixed"
				interface="action-sheet"
				placeholder="Selecteer soort schade">
				<IonSelectOption value="moedwillig">Moedwillig</IonSelectOption>
				<IonSelectOption value="slijtage">Slijtage</IonSelectOption>
				<IonSelectOption value="geweld">Geweld</IonSelectOption>
				<IonSelectOption value="normaal gebruik">Normaal gebruik</IonSelectOption>
				<IonSelectOption value="calamiteit">Calamiteit</IonSelectOption>
				<IonSelectOption value="anders">Anders</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem class="flex justify-between items-center">
			<IonLabel>Datum</IonLabel>
			<IonInput slot="end" type="date" v-model="inspection.date" />
		</IonItem>

		<IonItem class="flex justify-between items-center">
			<IonLabel>Acute actie vereist?</IonLabel>
			<IonCheckbox
				v-model="inspection.urgentActionRequired"
				slot="end"
				:value="inspection.urgentActionRequired" />
		</IonItem>

		<IonItem lines="none" class="flex justify-between items-center">
			<IonLabel position="stacked">Omschrijving</IonLabel>
			<IonTextarea
				v-model="inspection.damageDescription"
				auto-grow
				placeholder="Beschrijf de schade..." />
		</IonItem>

		<div class="mt-4">
			<IonLabel class="block mb-2 font-medium">Foto’s</IonLabel>
			<div class="flex gap-4 flex-wrap">
				<img
					v-for="n in [1, 2, 3, 4]"
					:key="n"
					:src="`/photos/${n}.jpg`"
					alt="Inspectiefoto"
					class="w-32 h-32 object-cover rounded-lg shadow" />
			</div>
		</div>
	</IonList>
</template>

<script setup>
import {
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonCheckbox,
	IonSelect,
	IonSelectOption,
	IonTextarea,
} from "@ionic/vue";

defineProps({
	inspection: {
		type: Object,
		required: true, // verwacht het damage-inspection object
	},
});
</script>
