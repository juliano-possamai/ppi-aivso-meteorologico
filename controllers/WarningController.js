const mongoose = require('mongoose');
const Warning = mongoose.model('Warning');

const validateData = (data) => {
	console.log("🚀 ~ validateData ~ data:", data)
	let errors = [];

	if (!data.name?.trim()) {
		errors.push({ field: 'name', message: 'O nome é obrigatório' });
	}

	const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (!data.email?.trim()) {
		errors.push({ field: 'email', message: 'O email é obrigatório' });
	} else if (!validEmailRegex.test(data.email)) {
		errors.push({ field: 'email', message: 'Informe um email válido' });
	}

	if (!data.maxDaysUntilEvent) {
		errors.push({ field: 'maxDaysUntilEvent', message: 'O máximo de dias até o evento é obrigatório' });
	} else if (data.maxDaysUntilEvent < 1) {
		errors.push({ field: 'maxDaysUntilEvent', message: 'O máximo de dias até o evento deve ser maior que 1' });
	} else if (data.maxDaysUntilEvent > 14) {
		errors.push({ field: 'maxDaysUntilEvent', message: 'O número máximo de dias até o evento é 14' });
	}

	if (!data.minimunProbability) {
		errors.push({ field: 'minimunProbability', message: 'O probabilidade mínima do evento ocorrer é obrigatória' });
	} else if (data.minimunProbability <= 0) {
		errors.push({ field: 'minimunProbability', message: 'O probabilidade mínima do evento ocorrer deve ser maior que 0' });
	}

	return errors;
}

module.exports = {
	async getAll(req, res) {
		const { page = 1 } = req.query;
		const warnings = await Warning.paginate({}, { page, limit: 10 });
		return res.json(warnings);
	},

	async save(req, res) {
		const errors = validateData(req.body);
		if (errors.length) {
			return res.status(400).json({ errors: errors });
		}

		const warning = await Warning.create(req.body);
		return res.status(201).json(warning);
	},

	async getById(req, res) {
		const warning = await Warning.findById(req.params.id);
		return res.json(warning);
	},

	async update(req, res) {
		const errors = validateData(req.body);
		if (errors.length) {
			return res.status(400).json({ errors: errors });
		}

		await Warning.findByIdAndUpdate(req.params.id, req.body);
		return res.status(204).send();
	},

	async delete(req, res) {
		await Warning.findByIdAndDelete(req.params.id);
		return res.status(204).send();
	},

};
