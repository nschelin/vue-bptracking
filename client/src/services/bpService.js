import api from '@/services/api';

export default {
	async getRecent(max) {
		return await api().get(`bpitems?max=${max}`);
	}
};
