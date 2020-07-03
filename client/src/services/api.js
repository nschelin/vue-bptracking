import axios from 'axios';

export default () => {
	const api = axios.create({
		baseURL: '/api'
	});

	api.interceptors.request.use(
		req => {
			const token = localStorage.getItem('token');
			if (token) {
				req.headers['Authorization'] = `Bearer ${token}`;
			}
			return req;
		},
		error => Promise.reject(error)
	);

	return api;
};
