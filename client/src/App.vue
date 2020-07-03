<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<div class="d-flex align-center">Blood Pressure Tracking</div>

			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn text v-if="!isAuthenticated" @click="dialog = true">Login</v-btn>
				<v-btn text v-else @click="logout">Logout</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-main class="ma-6">
			<router-view></router-view>
		</v-main>

		<v-dialog v-model="dialog" width="600px" persistent>
			<LoginComponent v-if="!isAuthenticated" @close="close" />
		</v-dialog>
	</v-app>
</template>

<script>
import { mapState } from 'vuex';
import LoginComponent from '@/components/LoginComponent';

export default {
	name: 'App',
	data: () => ({
		dialog: false
	}),
	computed: {
		...mapState({
			isAuthenticated: state => state.isAuthenticated
		})
	},
	methods: {
		async logout() {
			await this.$store.dispatch('logout');
		},
		close() {
			this.dialog = false;
		}
	},
	components: {
		LoginComponent
	}
};
</script>
