<template>
	<RouterLink
		:to="to"
		class="flex flex-col items-center justify-center gap-3 rounded-xl px-8 py-10 shadow-lg bg-white/90 hover:bg-white transition-all duration-200 no-underline ring-1 ring-slate-200"
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

<style scoped>
/* dark support (optioneel) */
:global(.dark) .menu-card {
	@apply bg-slate-800/70 hover:bg-slate-800 ring-slate-700;
}
:global(.dark) .menu-icon {
	color: #f1f5f9;
}
:global(.dark) .menu-title {
	@apply text-slate-100;
}
</style>
