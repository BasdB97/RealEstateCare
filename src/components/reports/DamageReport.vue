<template>
	<IonList :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem class="dark:text-white">
			<IonLabel position="stacked" class="dark:text-white">Locatie</IonLabel>
			<IonInput
				v-model="form.location"
				class="w-full dark:text-slate-400"
				:required="true"
				:readonly="isCompleted" />
		</IonItem>

		<IonItem class="dark:text-white">
			<IonLabel>Nieuwe schade?</IonLabel>
			<IonCheckbox slot="end" v-model="form.newDamage" :disabled="isCompleted" />
		</IonItem>

		<IonItem class="dark:text-white">
			<IonLabel>Soort schade</IonLabel>
			<IonSelect
				position="stacked"
				slot="end"
				v-model="form.damageType"
				labelPlacement="fixed"
				interface="action-sheet"
				class="dark:text-slate-400"
				:required="true"
				placeholder="Selecteer soort schade">
				<IonSelectOption value="moedwillig">Moedwillig</IonSelectOption>
				<IonSelectOption value="slijtage">Slijtage</IonSelectOption>
				<IonSelectOption value="geweld">Geweld</IonSelectOption>
				<IonSelectOption value="normaal gebruik">Normaal gebruik</IonSelectOption>
				<IonSelectOption value="calamiteit">Calamiteit</IonSelectOption>
				<IonSelectOption value="anders">Anders</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem class="dark:text-white">
			<IonLabel>Datum</IonLabel>
			<IonDatetimeButton
				:datetime="`dt-${form.id ?? 'x'}`"
				slot="end"
				:readonly="isCompleted"
				:required="true" />
			<IonModal v-if="!isCompleted" :keep-contents-mounted="true" close-on-click-backdrop="true">
				<IonDatetime
					v-model="form.date"
					:id="`dt-${form.id ?? 'x'}`"
					presentation="date"
					:show-default-buttons="true"
					done-text="Opslaan"
					cancel-text="Annuleren" />
			</IonModal>
		</IonItem>

		<IonItem class="dark:text-white">
			<IonLabel>Acute actie vereist?</IonLabel>
			<IonCheckbox slot="end" v-model="form.urgentActionRequired" :disabled="isCompleted" />
		</IonItem>

		<IonItem class="dark:text-white">
			<IonLabel position="stacked">Omschrijving</IonLabel>
			<IonTextarea
				class="dark:text-slate-400"
				v-model="form.damageDescription"
				auto-grow
				placeholder="Beschrijf schade..."
				:readonly="isCompleted"
				:required="true" />
		</IonItem>

		<IonItem lines="none" class="dark:text-white">
			<IonLabel position="stacked">Foto's</IonLabel>
			<PhotoUploader v-if="!isCompleted" v-model:photos="form.photos" :disabled="isCompleted" />
			<div v-else>
				<h4 class="text-center text-red-500 dark:text-red-400">Er zijn geen foto's gemaakt</h4>
			</div>
		</IonItem>

		<div class="mt-4 flex items-center justify-end gap-3" v-if="!isCompleted">
			<IonBadge v-if="isDirty" color="warning" class="p-2">Niet opgeslagen</IonBadge>
			<IonBadge v-else color="success" class="p-2">Opgeslagen</IonBadge>
			<IonButton size="small" :disabled="!isDirty" @click="saveLocalChanges">
				Inspectie opslaan
			</IonButton>
		</div>
	</IonList>
</template>

<script setup>
import PhotoUploader from "@/components/reports/PhotoUploader.vue";

// Vue composition API functies importeren
import { reactive, watch, toRaw, ref, onBeforeUnmount } from "vue";

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

// Props definitie - ontvangt inspection object van parent component
const props = defineProps({
	inspection: {
		type: Object,
		required: true, // verwacht het damage-inspection object
	},
	isCompleted: {
		type: Boolean,
		required: true,
	},
});

// Emit definitie - stuurt updates terug naar parent component
const emit = defineEmits(["saveLocalChanges"]);

// isDirty: houdt bij of het formulier is gewijzigd sinds laatste opslag
const isDirty = ref(false);

// form: reactive kopie van inspection data voor two-way binding
const form = reactive({
	...props.inspection,
	photos: props.inspection.photos ?? [],
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

function saveLocalChanges() {
	// console.log("saveLocalChanges", { ...toRaw(form) });
	emit("saveLocalChanges", { ...toRaw(form) });
	baseline.value = JSON.stringify({ ...toRaw(form) });
	isDirty.value = false;
}

defineExpose({
	saveLocalChanges,
	isDirty,
});
</script>
