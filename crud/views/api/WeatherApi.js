import axios from "axios";

export default class WarningApi {

	static baseUrl = 'http://localhost:3000/api';

	static async getAll() {
		return await axios.get(`${WarningApi.baseUrl}/warnings`);
	}

	static async getById(id) {
		return await axios.get(`${WarningApi.baseUrl}/warnings/${id}`);
	}

	static async create(data) {
		return await axios.post(`${WarningApi.baseUrl}/warnings`, data);
	}

	static async update(id, data) {
		return await axios.put(`${WarningApi.baseUrl}/warnings/${id}`, data);
	}

	static async delete(id) {
		return await axios.delete(`${WarningApi.baseUrl}/warnings/${id}`);
	}

}