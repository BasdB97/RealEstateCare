<template>
	<RouterLink
		:to="to"
		class="flex flex-col items-center justify-center gap-3 rounded-xl px-8 py-10 shadow-lg bg-white/90 transition-transform duration-150 ease-in-out no-underline ring-1 ring-slate-200 active:scale-95 active:bg-white transform-gpu touch-manipulation select-none"
		aria-label="menu item">
		<IonIcon :icon="icon" class="text-6xl text-primarybg" />
		<span class="font-bold text-2xl text-primarybg leading-tight text-center">{{ label }}</span>
	</RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { IonIcon } from "@ionic/vue";

defineProps({
	to: { type: String, required: true },
	label: { type: String, required: true },
	icon: { type: Object, required: true },
});
</script>

<style scoped></style>
