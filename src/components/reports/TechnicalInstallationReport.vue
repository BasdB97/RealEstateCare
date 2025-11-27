<template>
	<IonList :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem>
			<IonInput
				label="Locatie"
				labelPlacement="stacked"
				v-model="form.location"
				class="w-full dark:text-slate-400"
				:readonly="isCompleted"
				:required="true" />
		</IonItem>

		<IonItem>
			<IonSelect
				label="Soort installatie"
				v-model="form.technicalInstallationType"
				interface="action-sheet"
				placeholder="Soort installatie"
				class="dark:text-slate-400"
				:required="true">
				<IonSelectOption v-for="type in technicalInstallationTypes" :key="type" :value="type">
					{{ type }}
				</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
			<IonTextarea
				label="Beschrijf gemelde storingen"
				labelPlacement="stacked"
				lines="3"
				cols="40"
				v-model="form.reportedProblems"
				placeholder="Beschrijf gemelde storingen..."
				:readonly="isCompleted"
				:required="true" />
		</IonItem>

		<IonItem v-if="form.testProcedure && !isCompleted">
			<div class="text-lg font-medium mb-4">
				<IonLabel position="stacked" class="dark:text-white" id="testProcedure">
					Testprocedure:
				</IonLabel>
			</div>
			<div class="flex gap-2">
				<IonButton :href="pdfUrl" target="_blank" rel="noopener" aria-label="Open PDF" id="openPdf">
					Open PDF
				</IonButton>
				<IonButton :href="pdfUrl" download aria-label="Download PDF" id="downloadPdf"
					>Download PDF</IonButton
				>
			</div>
		</IonItem>
		<IonItem v-else class="text-red-500 dark:text-red-400">
			<IonLabel id="noTestProcedure"> Geen testprocedure beschikbaar: </IonLabel>
		</IonItem>

		<IonItem>
			<IonLabel class="dark:text-white" id="approved"> Goedgekeurd?: </IonLabel>
			<IonCheckbox slot="end" v-model="form.approved" :disabled="isCompleted" :required="true" />
		</IonItem>

		<IonItem lines="none">
			<IonTextarea
				label="Opmerkingen"
				labelPlacement="stacked"
				class="w-full dark:text-slate-400"
				v-model="form.remarks"
				:readonly="isCompleted"
				auto-grow
				placeholder="Beschrijf opmerking..."
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

const technicalInstallationTypes = [
	"Koeling",
	"Verwarming",
	"Luchtverversing",
	"Elektra",
	"Beveiliging",
];
</script>

<style scoped></style>
