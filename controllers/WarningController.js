const mongoose = require('mongoose');
const Warning = mongoose.model('Warning');

module.exports = {
	async getAll(req, res) {
		const { page = 1 } = req.query;
		const warnings = await Warning.paginate({}, { page, limit: 10 });
		return res.json(warnings);
	},

	//TODO replicar validações da interface na API + limite de avisos por usuário
	async save(req, res) {
		const warning = await Warning.create(req.body);
		return res.status(201).json(warning);
	},

	async getById(req, res) {
		const warning = await Warning.findById(req.params.id);
		return res.json(warning);
	},

	async update(req, res) {
		await Warning.findByIdAndUpdate(req.params.id, req.body);
		return res.status(204).send();
	},

	async delete(req, res) {
		await Warning.findByIdAndDelete(req.params.id);
		return res.status(204).send();
	},

};
