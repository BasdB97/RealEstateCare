<template>
	<RouterLink
		:to="to"
		class="flex flex-col items-center justify-center gap-3 rounded-xl px-8 py-10 shadow-lg dark:shadow-2xl dark:shadow-slate-900 bg-white dark:bg-slate-700 transition-transform duration-150 ease-in-out no-underline ring-1 ring-slate-200 dark:ring-slate-700 active:scale-95 active:bg-slate-50 dark:active:bg-slate-900 transform-gpu touch-manipulation select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600">
		<IonIcon :icon="icon" class="text-6xl text-primarybg dark:text-slate-200" />
		<span class="font-bold text-2xl leading-tight text-center text-primarybg dark:text-slate-100">
			{{ label }}
		</span>
	</RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { IonIcon } from "@ionic/vue";

defineProps({
	to: { type: String, required: true },
	label: { type: String, required: true },
	icon: { type: String, required: true },
});
</script>
