<template>
	<footer>
		<div class="flex justify-evenly items-center py-2 bg-[#00aaa2] dark:bg-teal-800 text-white">
			<RouterLink
				:aria-current="$route.path === link.to ? 'page' : undefined"
				v-for="link in links"
				:key="link.to"
				:to="link.to"
				:class="[
					'flex flex-col items-center no-underline gap-0.5 text-white text-[14px] sm:text-base md:text-xl leading-[1.43] sm:leading-6 md:leading-[1.4] transition-colors duration-200 active:text-gray-300 active:scale-105',
					$route.path === link.to ? 'font-bold' : '',
				]"
				><IonIcon
					:icon="link.icon"
					:class="[
						'text-2xl md:text-3xl',
						$route.path === link.to ? 'text-slate-500 dark:text-slate-400' : 'text-white',
					]"></IonIcon>
				<span>{{ link.label }}</span>
			</RouterLink>
		</div>
	</footer>
</template>

<script setup>
import { IonIcon } from "@ionic/vue";
import { home, search, informationCircle } from "ionicons/icons";

// Links voor de footer
const links = [
	{
		icon: home,
		label: "Home",
		to: "/",
	},
	{
		icon: search,
		label: "Zoeken",
		to: "/search",
	},
	{
		icon: informationCircle,
		label: "Informatie",
		to: "/information",
	},
];
</script>
