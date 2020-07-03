import Vue from 'vue';
import Vuex from 'vuex';
import { loginService } from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isAuthenticated: false,
		name: {
			fistName: '',
			lastName: ''
		}
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
		}
	},
	actions: {
		async login({ commit }, credentials) {
			const response = await loginService.login(credentials.email, credentials.password);

			commit('LOGIN', response.data);
		},
		async logout({ commit }) {
			commit('LOGOUT');
		}
	},
	modules: {}
});

export default store;
