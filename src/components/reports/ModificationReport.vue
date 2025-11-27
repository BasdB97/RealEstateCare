<template>
	<IonList :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem v-if="form.existingDocs && !isCompleted" lines="fill">
			<div class="text-lg font-medium mb-4">
				<IonLabel position="stacked" class="dark:text-white" id="existingDocs">
					Bestaande situatie of reeds gedocumenteerde modificaties:
					<span class="font-bold">{{ form.existingDocs }}</span>
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
			<IonLabel id="noExistingDocs"
				>Geen bestaande situatie of reeds gedocumenteerde modificaties beschikbaar</IonLabel
			>
		</IonItem>

		<IonItem>
			<IonInput
				label="Locatie aangetroffen modificatie"
				labelPlacement="stacked"
				v-model="form.location"
				class="w-full dark:text-slate-400"
				:required="true"
				:readonly="isCompleted" />
		</IonItem>

		<IonItem>
			<IonSelect
				label="Uitgevoerd door"
				v-model="form.executedBy"
				interface="action-sheet"
				class="dark:text-slate-400"
				placeholder="Selecteer uitvoerder"
				:required="true">
				<IonSelectOption value="huurder">Huurder</IonSelectOption>
				<IonSelectOption value="aannemer">Aannemer</IonSelectOption>
				<IonSelectOption value="andere">Onbekend</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
			<IonTextarea
				label="Beschrijving modificatie"
				labelPlacement="stacked"
				class="w-full dark:text-slate-400"
				v-model="form.modificationDescription"
				:readonly="isCompleted"
				auto-grow
				placeholder="Beschrijf de aangetroffen modificatie..."
				:required="true" />
		</IonItem>

		<IonItem>
			<IonSelect
				label="Te ondernemen actie"
				v-model="form.actionRequired"
				interface="action-sheet"
				class="dark:text-slate-400"
				:required="true"
				placeholder="Selecteer te ondernemen actie">
				<IonSelectOption value="laten controleren">Accepteren</IonSelectOption>
				<IonSelectOption value="laten keuren">Laten keuren</IonSelectOption>
				<IonSelectOption value="laten uitvoeren">Laten verwijderen</IonSelectOption>
				<IonSelectOption value="afwijzen">Laten aanpassen en keuren</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
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
	IonButton,
	IonInput,
	IonSelect,
	IonSelectOption,
	IonTextarea,
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
// form: reactive kopie van inspection data voor two-way binding
const form = reactive({
	...props.inspection,
});
const baseline = ref(JSON.stringify(form));
const pdfUrl = "/public/docs/modificaties_overzicht.pdf";

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
</script>

<style scoped></style>
