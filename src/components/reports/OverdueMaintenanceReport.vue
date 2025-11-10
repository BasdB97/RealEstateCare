<template>
	<IonList class="p-4" :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem>
			<IonLabel>Locatie</IonLabel>
			<IonInput
				slot="end"
				v-model="form.location"
				class="text-right w-1/2"
				:readonly="isCompleted" />
		</IonItem>

		<!-- TODO: add v-for to the IonSelectOptions and update script with options -->
		<IonItem class="items-start">
			<IonLabel>Soort onderhoud</IonLabel>
			<IonSelect
				slot="end"
				v-model="form.overdueMaintenanceType"
				interface="action-sheet"
				placeholder="Selecteer soort onderhoud">
				<IonSelectOption value="schilderwerk">Schilderwerk</IonSelectOption>
				<IonSelectOption value="houtrot">Houtrot</IonSelectOption>
				<IonSelectOption value="elektra">Elektra</IonSelectOption>
				<IonSelectOption value="leidingwerk">Leidingwerk</IonSelectOption>
				<IonSelectOption value="beglazing">Beglazing</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
			<IonLabel>Acute actie vereist?</IonLabel>
			<IonCheckbox slot="end" v-model="form.urgentActionRequired" :disabled="isCompleted" />
		</IonItem>

		<IonItem class="items-start">
			<IonLabel>Kostenindicatie</IonLabel>
			<IonSelect
				v-model="form.costEstimate"
				interface="action-sheet"
				slot="end"
				placeholder="Selecteer kostenindicatie">
				<IonSelectOption value="500-1500">€0 - €500</IonSelectOption>
				<IonSelectOption value="1500-3000">€500 - €1500</IonSelectOption>
				<IonSelectOption value="3000-5000">€1500+</IonSelectOption>
			</IonSelect>
		</IonItem>

		<div class="mt-4">
			<IonLabel class="block mb-2 font-medium">Foto’s</IonLabel>
			<div class="flex gap-4 flex-wrap justify-center">
				<img
					v-for="n in [1, 2, 3, 4]"
					:key="n"
					:src="`/photos/${n}.jpg`"
					alt="Inspectiefoto"
					class="w-32 h-32 object-cover rounded-lg shadow" />
			</div>
		</div>

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
</script>
