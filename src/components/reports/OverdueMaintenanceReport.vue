<template>
	<IonList :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem>
			<IonInput
				label="Locatie van het onderhoud"
				labelPlacement="stacked"
				v-model="form.location"
				class="w-full dark:text-slate-400"
				:readonly="isCompleted"
				:required="true" />
		</IonItem>

		<IonItem>
			<IonSelect
				label="Soort onderhoud"
				v-model="form.overdueMaintenanceType"
				interface="action-sheet"
				placeholder="Selecteer soort onderhoud"
				class="dark:text-slate-400"
				:required="true">
				<IonSelectOption v-for="type in maintenanceTypes" :key="type.value" :value="type.value">
					{{ type.label }}
				</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
			<IonLabel id="urgentActionRequired"> Acute actie vereist? </IonLabel>
			<IonCheckbox
				slot="end"
				v-model="form.urgentActionRequired"
				:disabled="isCompleted"
				:required="true" />
		</IonItem>

		<IonItem>
			<IonSelect
				label="Kosten indicatie"
				v-model="form.costEstimate"
				interface="action-sheet"
				class="dark:text-slate-400"
				placeholder="Selecteer kostenindicatie"
				:required="true">
				<IonSelectOption
					v-for="estimate in costEstimates"
					:key="estimate.value"
					:value="estimate.value">
					{{ estimate.label }}
				</IonSelectOption>
			</IonSelect>
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
		// console.log("form changed:", v);
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
	// console.log("saveLocalChanges", { ...toRaw(form) });
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

const costEstimates = [
	{ label: "€0 - €500", value: "500-1500" },
	{ label: "€500 - €1500", value: "1500-3000" },
	{ label: "€1500+", value: "3000-5000" },
];
</script>
