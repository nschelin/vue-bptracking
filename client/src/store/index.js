import Vue from 'vue';
import Vuex from 'vuex';
import { loginService, bpService } from '../services';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isNewItem: false,
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
		LOGIN(state, { token, msg }) {
			if (token) {
				state.isAuthenticated = true;
				localStorage.setItem('token', token);
			}
			if(msg) {
				console.log(msg);
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
			state.bpItems = data.bpItems;
			state.totalItems = data.totalItems;
			state.totalPages = data.totalPages;
		},
		SET_NEW_ITEM(state, val) {
			state.isNewItem = val;
		},
		// ITEM_ADDED(state, refresh) {

		// }
	},
	actions: {
		async login({ commit }, credentials) {
			const { email, password } = credentials;
			const response = await loginService.login(email, password);
			commit('LOGIN', response.data);
		},
		async logout({ commit }) {
			commit('LOGOUT');
		},
		async getRecent({ commit }, maxItems) {
			const { data } = await bpService.getRecent(maxItems);
			commit('SET_RECENT', data);
		},
		async getBpItems({ commit }, pagination) {
			const { data } = await bpService.getBpItems(pagination.page, pagination.sortField, pagination.sortDir);
			commit('SET_BPITEMS', data);
		},
		async addBpItem(state, data) {
			 await bpService.addBpItem(data);
		}
	},
	modules: {}
});

if (localStorage.getItem('token')) {
	const token = localStorage.getItem('token');
	store.commit('LOGIN', { token });
}

export default store;
