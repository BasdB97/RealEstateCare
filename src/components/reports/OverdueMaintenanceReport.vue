<template>
	<IonList :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem>
			<IonLabel position="stacked" class="dark:text-white">Locatie</IonLabel>
			<IonInput
				v-model="form.location"
				class="w-full dark:text-slate-400"
				:readonly="isCompleted" />
		</IonItem>

		<!-- TODO: add v-for to the IonSelectOptions and update script with options -->
		<IonItem class="items-start">
			<IonLabel position="stacked" class="dark:text-white">Soort onderhoud</IonLabel>
			<IonSelect
				v-model="form.overdueMaintenanceType"
				interface="action-sheet"
				placeholder="Selecteer soort onderhoud"
				class="dark:text-slate-400">
				<IonSelectOption v-for="type in maintenanceTypes" :key="type.value" :value="type.value">
					{{ type.label }}
				</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
			<IonLabel class="dark:text-white">Acute actie vereist?</IonLabel>
			<IonCheckbox slot="end" v-model="form.urgentActionRequired" :disabled="isCompleted" />
		</IonItem>

		<IonItem class="items-start">
			<IonLabel position="stacked" class="dark:text-white">Kostenindicatie</IonLabel>
			<IonSelect
				v-model="form.costEstimate"
				interface="action-sheet"
				class="w-full dark:text-slate-400"
				placeholder="Selecteer kostenindicatie">
				<IonSelectOption value="500-1500">€0 - €500</IonSelectOption>
				<IonSelectOption value="1500-3000">€500 - €1500</IonSelectOption>
				<IonSelectOption value="3000-5000">€1500+</IonSelectOption>
			</IonSelect>
		</IonItem>

		<PhotoUploader v-if="!isCompleted" v-model:photos="form.photos" :disabled="isCompleted" />

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
import { reactive, watch, toRaw, ref } from "vue";
import {
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonCheckbox,
	IonBadge,
	IonButton,
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
const isDirty = ref(false);
// form: reactive kopie van inspection data voor two-way binding
const form = reactive({
	...props.inspection,
});
const baseline = ref(JSON.stringify(form));

watch(
	() => props.inspection,
	(v) => {
		Object.assign(form, v);
		baseline.value = JSON.stringify(v);
		isDirty.value = false;
		console.log("form changed:", v);
	},
	{ deep: true }
);

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
	console.log("saveLocalChanges", { ...toRaw(form) });
	emit("saveLocalChanges", { ...toRaw(form) });
	baseline.value = JSON.stringify({ ...toRaw(form) });
	isDirty.value = false;
}
defineExpose({
	saveLocalChanges,
	isDirty,
});

const maintenanceTypes = [
	{ label: "Schilderwerk", value: "schilderwerk" },
	{ label: "Houtrot", value: "houtrot" },
	{ label: "Elektra", value: "elektra" },
	{ label: "Leidingwerk", value: "leidingwerk" },
	{ label: "Beglazing", value: "beglazing" },
];
</script>
