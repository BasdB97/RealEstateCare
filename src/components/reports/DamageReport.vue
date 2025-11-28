<template>
	<IonList :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem class="dark:text-white">
			<IonInput
				id="damageLocation"
				label="Locatie van de schade"
				labelPlacement="stacked"
				v-model="form.location"
				class="w-full dark:text-slate-400"
				:required="true"
				:readonly="isCompleted" />
		</IonItem>

		<IonItem class="dark:text-white">
			<IonLabel id="newDamage"> Betreft het nieuwe schade? </IonLabel>
			<IonCheckbox
				aria-labelledby="newDamage"
				slot="end"
				v-model="form.newDamage"
				:disabled="isCompleted"
				:required="true" />
		</IonItem>

		<IonItem class="dark:text-white">
			<IonSelect
				id="damageType"
				label="Soort schade"
				labelPlacement="fixed"
				v-model="form.damageType"
				interface="action-sheet"
				class="dark:text-slate-400"
				:required="true"
				placeholder="Selecteer soort schade">
				<IonSelectOption v-for="type in damageTypes" :key="type.value" :value="type.value">
					{{ type.label }}
				</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem class="dark:text-white">
			<IonLabel id="damageDate">Datum van de schade:</IonLabel>
			<template v-if="isCompleted">
				<IonLabel slot="end" class="dark:text-slate-400">
					{{ form.date ? new Date(form.date).toLocaleDateString("nl-NL") : "Geen datum" }}
				</IonLabel>
			</template>
			<template v-else>
				<IonDatetimeButton
					:datetime="`dt-${form.id ?? 'x'}`"
					slot="end"
					aria-labelledby="damageDate" />
				<IonModal :keep-contents-mounted="true" close-on-click-backdrop="true">
					<IonDatetime
						v-model="form.date"
						:id="`dt-${form.id ?? 'x'}`"
						presentation="date"
						:show-default-buttons="true"
						done-text="Opslaan"
						cancel-text="Annuleren"
						aria-labelledby="damageDate" />
				</IonModal>
			</template>
		</IonItem>

		<IonItem class="dark:text-white">
			<IonLabel id="urgentActionRequired"> Acute actie vereist? </IonLabel>
			<IonCheckbox
				slot="end"
				v-model="form.urgentActionRequired"
				:disabled="isCompleted"
				:required="true" />
		</IonItem>

		<IonItem class="dark:text-white">
			<IonTextarea
				label="Omschrijving van de schade"
				labelPlacement="stacked"
				class="w-full dark:text-slate-400"
				v-model="form.damageDescription"
				:readonly="isCompleted"
				auto-grow
				placeholder="Beschrijf schade..."
				:required="true" />
		</IonItem>

		<IonItem lines="none" class="dark:text-white">
			<IonLabel position="stacked" id="photos">Foto's:</IonLabel>
			<PhotoUploader
				v-if="!isCompleted"
				v-model:photos="form.photos"
				:disabled="isCompleted"
				:aria-labelledby="'photos'" />
			<div v-else>
				<h4 class="text-center text-red-500 dark:text-red-400">Er zijn geen foto's gemaakt</h4>
			</div>
		</IonItem>

		<div class="mt-4 flex items-center justify-end gap-3" v-if="!isCompleted">
			<IonBadge role="status" aria-live="polite" v-if="isDirty" color="warning" class="p-2"
				>Niet opgeslagen</IonBadge
			>
			<IonBadge role="status" aria-live="polite" v-else color="success" class="p-2"
				>Opgeslagen</IonBadge
			>
			<IonButton
				size="small"
				:disabled="!isDirty"
				@click="saveLocalChanges"
				aria-label="Inspectie opslaan">
				Inspectie opslaan
			</IonButton>
		</div>
	</IonList>
</template>

<script setup>
import PhotoUploader from "@/components/PhotoUploader.vue";

import { reactive, watch, toRaw, ref, onBeforeUnmount } from "vue";

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

const props = defineProps({
	inspection: {
		type: Object,
		required: true,
	},
	isCompleted: {
		type: Boolean,
		required: true,
	},
});

const emit = defineEmits(["saveLocalChanges"]);

// houdt bij of het formulier is gewijzigd sinds laatste opslag
const isDirty = ref(false);

const form = reactive({
	...props.inspection,
	photos: props.inspection.photos ?? [],
});

// JSON string van laatste opgeslagen staat voor vergelijking
const baseline = ref(JSON.stringify(form));

// Watcher: observeert veranderingen in props.inspection
// Triggered wanneer parent component nieuwe data doorgeeft
watch(
	() => props.inspection,
	(v) => {
		Object.assign(form, v); // Update form met nieuwe data
		baseline.value = JSON.stringify(v); // Sla nieuwe baseline op
		isDirty.value = false; // Reset dirty flag (geen wijzigingen)
		// console.log("form changed:", v);
	},
	{ deep: true } // Observeer ook nested properties
);

// Watcher: detecteert wijzigingen in het formulier
// Vergelijkt huidige form-staat met baseline voor dirty tracking
let t;
watch(
	form,
	() => {
		clearTimeout(t);
		t = setTimeout(() => {
			isDirty.value = JSON.stringify(toRaw(form)) !== baseline.value;
		}, 150); // debounce
	},
	{ deep: true }
);

// Sla de wijzigingen op in de local storage
function saveLocalChanges() {
	emit("saveLocalChanges", { ...toRaw(form) });
	baseline.value = JSON.stringify({ ...toRaw(form) });
	isDirty.value = false;
}

// Expose de functies voor het parent component
defineExpose({
	saveLocalChanges,
	isDirty,
});

// Soorten schade
const damageTypes = [
	{ label: "Moedwillig", value: "moedwillig" },
	{ label: "Slijtage", value: "slijtage" },
	{ label: "Geweld", value: "geweld" },
	{ label: "Normaal gebruik", value: "normaal gebruik" },
	{ label: "Calamiteit", value: "calamiteit" },
	{ label: "Anders", value: "anders" },
];
</script>
