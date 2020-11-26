import api from '@/services/api';

export default {
	async getRecent(max) {
		return await api().get(`bpitems/recent?max=${max}`);
	},
	async getBpItems(page = 1, sortBy, sortDir) {
		return await api().get(`bpItems/${page}?sf=${sortBy}&sd=${sortDir}`);
	},
	async addBpItem(data) {
		return await api().post(`bpitem/add`, data);
	}
};
