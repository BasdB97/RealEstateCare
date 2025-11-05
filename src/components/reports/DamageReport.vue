<template>
	<IonList class="p-4">
		<IonItem>
			<IonLabel>Locatie</IonLabel>
			<IonInput slot="end" v-model="form.location" class="text-right w-1/2" />
		</IonItem>

		<IonItem>
			<IonLabel>Nieuwe schade?</IonLabel>
			<IonCheckbox slot="end" v-model="form.newDamage" />
		</IonItem>

		<IonItem>
			<IonSelect
				v-model="form.damageType"
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

		<IonItem>
			<IonLabel>Datum</IonLabel>
			<IonDatetimeButton :datetime="`datetime-${form.id}`" slot="end" />
			<IonModal :keep-contents-mounted="true">
				<IonDatetime
					v-model="form.date"
					:id="`datetime-${form.id}`"
					presentation="date"
					show-adjacent-days="true"
					:show-default-buttons="true"
					done-text="Opslaan"
					cancel-text="Annuleren" />
			</IonModal>
		</IonItem>

		<IonItem>
			<IonLabel>Acute actie vereist?</IonLabel>
			<IonCheckbox slot="end" v-model="form.urgentActionRequired" />
		</IonItem>

		<IonItem lines="none">
			<IonLabel position="stacked">Omschrijving</IonLabel>
			<IonTextarea v-model="form.damageDescription" auto-grow placeholder="Beschrijf schade..." />
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
		<div class="mt-4 flex items-center justify-end gap-3">
			<IonBadge v-if="isDirty" color="warning">Niet opgeslagen</IonBadge>
			<IonBadge v-else color="success">Opgeslagen</IonBadge>
			<IonButton size="small" :disabled="!isDirty" @click="saveLocalChanges"
				>Inspectie opslaan</IonButton
			>
		</div>
	</IonList>
</template>

<script setup>
// Ionic UI componenten importeren
import {
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonCheckbox,
	IonSelect,
	IonSelectOption,
	IonTextarea,
	IonButton,
	IonDatetime,
	IonDatetimeButton,
	IonModal,
	IonBadge,
} from "@ionic/vue";
// Vue composition API functies importeren
import { reactive, watch, toRaw, ref } from "vue";

// Props definitie - ontvangt inspection object van parent component
const props = defineProps({
	inspection: {
		type: Object,
		required: true, // verwacht het damage-inspection object
	},
});

// Emit definitie - stuurt updates terug naar parent component
const emit = defineEmits(["update"]);

// isDirty: houdt bij of het formulier is gewijzigd sinds laatste opslag
const isDirty = ref(false);

// form: reactive kopie van inspection data voor two-way binding
const form = reactive({
	...props.inspection,
});

// baseline: JSON string van laatste opgeslagen staat voor vergelijking
const baseline = ref(JSON.stringify(form));

// Watcher: observeert veranderingen in props.inspection
// Triggered wanneer parent component nieuwe data doorgeeft
watch(
	() => props.inspection,
	(v) => {
		Object.assign(form, v); // Update form met nieuwe data
		baseline.value = JSON.stringify(v); // Sla nieuwe baseline op
		isDirty.value = false; // Reset dirty flag (geen wijzigingen)
		console.log("form changed:", v); // Debug log
	},
	{ deep: true } // Observeer ook nested properties
);

// Watcher: detecteert wijzigingen in het formulier
// Vergelijkt huidige form-staat met baseline voor dirty tracking
watch(
	form,
	() => {
		// Zet isDirty op true als form verschilt van baseline
		isDirty.value = JSON.stringify(toRaw(form)) !== baseline.value;
	},
	{ deep: true } // Observeer alle form fields
);

// save: stuurt form data naar parent en update baseline
function saveLocalChanges() {
	console.log("saveLocalChanges", { ...toRaw(form) });
	emit("saveLocalChanges", { ...toRaw(form) }); // Emit update event met form data
	baseline.value = JSON.stringify({ ...toRaw(form) }); // Update baseline
	isDirty.value = false; // Reset dirty flag
}
</script>
