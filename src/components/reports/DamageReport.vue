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
			<IonButton size="small" :disabled="!isDirty" @click="save">Inspectie opslaan</IonButton>
		</div>
	</IonList>
</template>

<script setup>
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
import { reactive, watch, toRaw, ref } from "vue";

const props = defineProps({
	inspection: {
		type: Object,
		required: true, // verwacht het damage-inspection object
	},
});

const emit = defineEmits(["update"]);
const isDirty = ref(false);

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
	},
	{ deep: true }
);

watch(
	form,
	() => {
		isDirty.value = JSON.stringify(toRaw(form)) !== baseline.value;
	},
	{ deep: true }
);
function save() {
	emit("update", { ...toRaw(form) });
	baseline.value = JSON.stringify({ ...toRaw(form) });
	isDirty.value = false;
}
</script>
