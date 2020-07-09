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
		bpItems: [],
		totalItems: 0,
		totalPages: 0,
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
		},
		SET_BPITEMS(state, data) {
			state.bpItems = [...state.bpItems, ...data.bpItems];
			state.totalItems = data.totalItems;
			state.totalPages = data.totalPages;
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
		},
		async getBpItems({ commit }, page = 1) {
			const { data } = await bpService.getBpItems(page);
			console.log(data);
			commit('SET_BPITEMS', data);
		}
	},
	modules: {}
});

if (localStorage.getItem('token')) {
	const token = localStorage.getItem('token');
	store.commit('LOGIN', { token });
}

export default store;
