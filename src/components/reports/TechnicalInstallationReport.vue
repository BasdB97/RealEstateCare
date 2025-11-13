<template>
	<IonList :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem>
			<IonLabel position="stacked">Locatie</IonLabel>
			<IonInput v-model="form.location" class="w-full" />
		</IonItem>

		<IonItem class="items-start">
			<IonLabel position="stacked">Soort installatie</IonLabel>
			<IonSelect
				v-model="form.technicalInstallationType"
				interface="action-sheet"
				placeholder="Selecteer soort installatie">
				<IonSelectOption v-for="type in technicalInstallationTypes" :key="type" :value="type">
					{{ type }}
				</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
			<IonLabel position="stacked">Gemelde storingen</IonLabel>
			<IonTextarea
				class="w-full"
				lines="3"
				cols="20"
				v-model="form.reportedProblems"
				placeholder="Beschrijf gemelde storingen..."
				:readonly="isCompleted" />
		</IonItem>

		<IonItem v-if="form.testProcedure">
			<div class="text-lg font-medium mb-4">
				<IonLabel position="stacked">Testprocedure:</IonLabel>
			</div>
			<div class="flex gap-2">
				<IonButton :href="pdfUrl" target="_blank" rel="noopener"> Open PDF </IonButton>
				<IonButton :href="pdfUrl" download>Download PDF</IonButton>
			</div>
		</IonItem>
		<IonItem v-else class="text-red-500 dark:text-red-400">
			<IonLabel>Geen testprocedure beschikbaar</IonLabel>
		</IonItem>

		<IonItem>
			<IonLabel>Goedgekeurd?</IonLabel>
			<IonCheckbox slot="end" v-model="form.approved" :disabled="isCompleted" />
		</IonItem>

		<IonItem lines="none">
			<IonLabel position="stacked">Opmerkingen</IonLabel>
			<IonTextarea
				class="w-full"
				v-model="form.remarks"
				:readonly="isCompleted"
				auto-grow
				placeholder="Beschrijf opmerking..." />
		</IonItem>

		<div class="ml-4">
			<IonLabel class="mb-2 font-medium dark:text-slate-200">Foto's</IonLabel>
			<div class="flex gap-4 flex-wrap justify-center">
				<img
					v-for="n in [1, 2, 3, 4]"
					:key="n"
					:src="`/photos/${n}.jpg`"
					alt="Inspectiefoto"
					class="w-32 h-32 object-cover rounded-lg shadow dark:shadow-slate-900" />
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
import { reactive, watch, toRaw, ref } from "vue";

import {
	IonList,
	IonItem,
	IonLabel,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonTextarea,
	IonButton,
	IonCheckbox,
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
const isDirty = ref(false);
const form = reactive({
	...props.inspection,
});
const baseline = ref(JSON.stringify(form));
const pdfUrl = "/public/docs/testprocedure.pdf";

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

const technicalInstallationTypes = [
	"Koeling",
	"Verwarming",
	"Luchtverversing",
	"Elektra",
	"Beveiliging",
];
</script>

<style scoped></style>
