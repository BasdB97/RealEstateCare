<template>
	<footer>
		<div class="footer-container">
			<router-link to="/" class="footer-link">
				<ion-icon :icon="home"></ion-icon>
				<span>Home</span>
			</router-link>
			<router-link to="/search" class="footer-link">
				<ion-icon :icon="search"></ion-icon>
				<span>Zoeken</span>
			</router-link>
			<router-link to="/information" class="footer-link">
				<ion-icon :icon="informationCircle"></ion-icon>
				<span>Informatie</span>
			</router-link>
		</div>
	</footer>
</template>
<script setup></script>
