import api from '@/services/api';

export default {
	async login(email, password) {
		const data = { email, password };
		return await api().post('login', data);
	}
};
