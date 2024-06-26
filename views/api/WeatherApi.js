import api from './api';

export default class WarningApi {
	static async getAll() {
		return await api.get('/warnings');
	}

	static async getById(id) {
		return await api.get(`/warnings/${id}`);
	}

	static async create(data) {
		return await api.post('/warnings', data);
	}

	static async update(id, data) {
		return await api.put(`/warnings/${id}`, data);
	}

	static async delete(id) {
		return await api.delete(`/warnings/${id}`);
	}

}