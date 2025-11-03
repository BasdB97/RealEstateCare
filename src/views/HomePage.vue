<template>
	<BaseLayout>
		<div class="home-container">
			<section class="menu-container">
				<router-link to="/assigned-reports" class="menu-item">
					<ion-icon :icon="bookmarkOutline" class="menu-icon" />
					<span class="menu-title">Toegewezen</span>
				</router-link>
				<router-link to="/completed-reports" class="menu-item">
					<ion-icon :icon="checkmarkCircle" class="menu-icon" />
					<span class="menu-title">Uitgevoerd</span>
				</router-link>
				<router-link to="/knowledge-base" class="menu-item">
					<ion-icon :icon="apps" class="menu-icon" />
					<span class="menu-title">Kennisbank</span>
				</router-link>
				<router-link to="/settings" class="menu-item">
					<ion-icon :icon="settings" class="menu-icon" />
					<span class="menu-title">Instellingen</span>
				</router-link>
			</section>
		</div>
	</BaseLayout>
</template>

<script setup></script>
