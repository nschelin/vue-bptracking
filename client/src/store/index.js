import Vue from 'vue';
import Vuex from 'vuex';
import { loginService, bpService } from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isAuthenticated: false,
		name: {
			fistName: '',
			lastName: ''
		},
		recentBpItems: []
	},
	getters: {
		isAuthenticated(state) {
			return state.isAuthenticated;
		}
	},
	mutations: {
		LOGIN(state, { token }) {
			if (token) {
				state.isAuthenticated = true;
				localStorage.setItem('token', token);
			}
		},
		LOGOUT() {
			localStorage.removeItem('token');
			location.reload();
		},
		SET_RECENT(state, { bpItems }) {
			state.recentBpItems = bpItems;
		}
	},
	actions: {
		async login({ commit }, credentials) {
			const response = await loginService.login(credentials.email, credentials.password);
			commit('LOGIN', response.data);
		},
		async logout({ commit }) {
			commit('LOGOUT');
		},
		async getRecent({ commit }, maxItems) {
			const { data } = await bpService.getRecent(maxItems);
			commit('SET_RECENT', data);
		}
	},
	modules: {}
});

if (localStorage.getItem('token')) {
	const token = localStorage.getItem('token');
	store.commit('LOGIN', { token });
}

export default store;
