<template>
	<IonList class="p-4" :class="{ 'pointer-events-none opacity-100': isCompleted }">
		<IonItem v-if="form.existingDocs">
			<IonLabel position="stacked">
				Bestaande situatie of reeds gedocumenteerde modificaties
			</IonLabel>
			<div class="flex gap-2">
				<IonButton :href="pdfUrl" target="_blank" rel="noopener">
					Open {{ form.existingDocs }}
				</IonButton>
				<IonButton :href="pdfUrl" download>Download {{ form.existingDocs }}</IonButton>
			</div>
		</IonItem>
		<IonItem v-else class="text-red-500 dark:text-red-400">
			<IonLabel>Geen bestaande situatie of reeds gedocumenteerde modificaties beschikbaar</IonLabel>
		</IonItem>

		<IonItem>
			<IonLabel>Locatie aangetroffen modificatie</IonLabel>
			<IonInput
				slot="end"
				v-model="form.location"
				class="text-right w-1/2"
				:readonly="isCompleted" />
		</IonItem>

		<IonItem class="items-start">
			<IonLabel>Uitgevoerd door</IonLabel>
			<IonSelect
				slot="end"
				v-model="form.executedBy"
				interface="action-sheet"
				placeholder="Selecteer uitvoerder">
				<IonSelectOption value="huurder">Huurder</IonSelectOption>
				<IonSelectOption value="aannemer">Aannemer</IonSelectOption>
				<IonSelectOption value="andere">Onbekend</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
			<IonLabel>Beschrijving modificatie</IonLabel>
			<IonTextarea
				slot="end"
				lines="3"
				cols="20"
				v-model="form.modificationDescription"
				placeholder="Beschrijf de aangetroffen modificatie..."
				:readonly="isCompleted" />
		</IonItem>

		<IonItem class="items-start">
			<IonLabel>Te ondernemen actie</IonLabel>
			<IonSelect
				slot="end"
				v-model="form.actionRequired"
				interface="action-sheet"
				placeholder="Selecteer te ondernemen actie">
				<IonSelectOption value="laten controleren">Accepteren</IonSelectOption>
				<IonSelectOption value="laten keuren">Laten keuren</IonSelectOption>
				<IonSelectOption value="laten uitvoeren">Laten verwijderen</IonSelectOption>
				<IonSelectOption value="afwijzen">Laten aanpassen en keuren</IonSelectOption>
			</IonSelect>
		</IonItem>

		<IonItem>
			<IonLabel>Opmerkingen</IonLabel>
			<IonTextarea
				slot="end"
				lines="3"
				cols="20"
				v-model="form.remarks"
				placeholder="Beschrijf opmerking..."
				:readonly="isCompleted" />
		</IonItem>

		<div class="mt-4">
			<IonLabel class="block mb-2 font-medium dark:text-slate-200">Foto's</IonLabel>
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

<style scoped></style>
