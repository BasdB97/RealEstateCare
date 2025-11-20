<template>
	<div class="ml-4">
		<div class="flex gap-4 flex-wrap justify-center">
			<img
				v-for="photo in photos"
				:key="photo.id"
				:src="photo.url"
				:alt="photo.name || 'Inspectiefoto'"
				class="w-32 h-32 object-cover rounded-lg shadow dark:shadow-slate-900" />
		</div>

		<input
			ref="fileInput"
			type="file"
			accept="image/*"
			capture="environment"
			multiple
			class="hidden"
			@change="handleFileChange"
			:disabled="disabled" />

		<div class="mt-4 flex items-center justify-center">
			<IonButton @click="handleAddPhoto" :disabled="disabled"> Foto toevoegen </IonButton>
		</div>
	</div>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { IonLabel, IonButton } from "@ionic/vue";

const props = defineProps({
	photos: { type: Array, required: true }, // v-model:photos
	disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:photos"]);

const fileInput = ref(null);
const objectUrls = [];

function handleAddPhoto() {
	if (fileInput.value) fileInput.value.click();
}

function handleFileChange(event) {
	const files = Array.from(event.target.files || []);

	const newPhotos = props.photos.slice();

	files.forEach((file) => {
		const url = URL.createObjectURL(file);
		objectUrls.push(url);

		newPhotos.push({
			id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
			url,
			name: file.name,
		});
	});

	emit("update:photos", newPhotos);
	event.target.value = "";
}

onBeforeUnmount(() => {
	objectUrls.forEach((url) => URL.revokeObjectURL(url));
});
</script>
