<template>
	<v-app id="bp">
		<v-navigation-drawer v-model="drawer" app clipped>
			<v-container class="fill-height align-content-space-between">
				<v-row>
					<v-col class="ma-0 pa-0">
						<v-list>
							<v-list-item link to="/">
								<v-list-item-action>
									<v-icon>mdi-home</v-icon>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title>Home</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-list-item link to="/bp" v-if="isAuthenticated">
								<v-list-item-action>
									<v-icon>mdi-speedometer</v-icon>
								</v-list-item-action>
								<v-list-item-content>
									<v-list-item-title>Blood Pressure Data</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-col>
				</v-row>
			</v-container>
		</v-navigation-drawer>

		<v-app-bar app clipped-left color="primary" dark>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-icon class="mx-4" large>{{ icon }}</v-icon>
			<v-toolbar-title @click="$router.push({ name: 'Home' })">Blood Pressure</v-toolbar-title>

			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn text v-if="!isAuthenticated" @click="dialog = true">Login</v-btn>
				<v-btn text v-else @click="logout">Logout</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-main class="ma-6">
			<v-container>
				<transition name="slide-fade" mode="out-in">
					<router-view></router-view>
				</transition>
			</v-container>
		</v-main>

		<v-dialog v-model="dialog" width="600px" persistent>
			<LoginComponent v-if="!isAuthenticated" @close="close" />
		</v-dialog>

		<v-footer app class="justify-end" color="primary">
			<div class="white--text">&copy; {{ year }}</div>
		</v-footer>
	</v-app>
</template>

<script>
import { mapState } from 'vuex';
import LoginComponent from '@/components/LoginComponent';

export default {
	name: 'App',
	data: () => ({
		dialog: false,
		drawer: false,
		year: new Date().getFullYear(),
		icon: 'mdi-speedometer-slow',
		icons: ['mdi-speedometer-slow', 'mdi-speedometer-medium', 'mdi-speedometer'],
		iconIndex: 0,
		iconSpeed: 1000
	}),
	watch: {
		// eslint-disable-next-line
		$route(from, to) {
			this.drawer = false;
		}
	},
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
	mounted() {
		setInterval(() => {
			if (this.iconIndex < 2) {
				this.iconIndex++;
			} else {
				this.iconIndex = 1;
				this.icons = this.icons.reverse();
			}

			//console.log(index, icons[index]);
			this.icon = this.icons[this.iconIndex];
		}, this.iconSpeed);
	},
	components: {
		LoginComponent
	}
};
</script>

<style lang="scss">
@import './styles.scss';
.v-toolbar__content {
	cursor: pointer;
}
</style>
