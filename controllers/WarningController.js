const { Warning } = require('../models');

const validateData = async(id, data) => {
	let errors = [];

	if (!id.length && await Warning.count() >= 3) {
		errors.push({ field: 'generic', message: 'Você atingiu o número máximo de 3 avisos!' });
		return errors;
	}

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
	} else if (data.minimunProbability < 5) {
		errors.push({ field: 'minimunProbability', message: 'O probabilidade mínima do evento ocorrer deve ser maior que 5' });
	} else if (data.minimunProbability > 99) {
		errors.push({ field: 'minimunProbability', message: 'O probabilidade mínima do evento ocorrer deve ser menor que 100' });
	}

	return errors;
}

module.exports = {
	async getAll(req, res) {
		const warnings = await Warning.findAll();
		return res.json(warnings);
	},

	async save(req, res) {
		const errors = await validateData('', req.body);
		if (errors.length) {
			return res.status(400).json({ errors: errors });
		}

		const warning = await Warning.create(req.body);
		return res.status(201).json(warning);
	},

	async getById(req, res) {
		const warning = await Warning.findByPk(req.params.id);
		return res.json(warning);
	},

	async update(req, res) {
		const errors = await validateData(req.params.id, req.body);
		if (errors.length) {
			return res.status(400).json({ errors: errors });
		}

		await Warning.update(req.body, { where: { id: req.params.id } });
		return res.status(204).send();
	},

	async delete(req, res) {
		await Warning.destroy({ where: { id: req.params.id } });
		return res.status(204).send();
	},

};
