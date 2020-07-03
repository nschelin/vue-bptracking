<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">Blood Pressure Tracking</div>

			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn text>Login</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-main class="ma-6">
			<router-view></router-view>
		</v-main>
	</v-app>
</template>

<script>
// import Home from './components/HelloWorld';

export default {
	name: 'App',

	components: {
		// HelloWorld
	},

	data: () => ({
		//
	})
};
</script>
