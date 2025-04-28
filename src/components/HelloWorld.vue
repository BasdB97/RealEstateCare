<script setup>
defineProps({
	msg: {
		type: String,
		required: true,
	},
});
</script>

<template>
	<main>
		<div class="greetings">
			<h1>{{ msg }}</h1>
			<p>
				RealEstateCare is een applicatie die gebruikt wordt door
				inspecteurs om rapportages te maken over onderhoudsbehoeften van
				vastgoed.
			</p>
			<em>Deze website is nog in ontwikkeling.</em>
		</div>
	</main>
</template>

<style scoped>
main {
	padding: 1rem;
}
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	position: relative;
	top: -10px;
}

.greetings {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style>
