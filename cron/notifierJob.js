const requireDir = require('require-dir');
requireDir('../models');

//TODO iniciar requisição de um lugar centralizado
const mongoose = require('mongoose');
const uri = 'mongodb://127.0.0.1:27017';
mongoose.connect(uri);
const Warning = mongoose.model('Warning');

class NotifierJob {

	constructor(weatherApi, mailer) {
		this.weatherApi = weatherApi;
		this.mailer = mailer;
	}

	async run() {
		let warnings = await Warning.find();
		if (!warnings.length) {
			return;
		}

		let rawResponse = await this.weatherApi.fetch();
		let dailyWeather = this.weatherApi.adaptResponse(rawResponse);

		let pendingEmails = {};
		for (let warning of warnings) {
			for (let weather of dailyWeather) {
				if (this.shouldNotify(warning, weather)) {
					pendingEmails[warning.email] = [
						...pendingEmails[warning.email] || [],
						{ date: weather.date, probability: weather.rainProbability, message: weather.message }
					]
				}
			}
		}

		this.notifyPendingEmails(pendingEmails);
	}

	notifyPendingEmails(emails) {
		for (let email in emails) {
			this.mailer.setMailOptions(
				email,
				'Aviso meteorológico',
				this.getFormattedMessage(emails[email])
			).send();
		}
	}

	getFormattedMessage(notifications) {
		notifications.reduce((acc, notification) => {
			let formattedDate = new Date(notification.date).toLocaleDateString('pt-BR', {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			});

			formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
			return acc + `${formattedDate}, Probabilidade de chuva de ${notification.probability}%. ${notification.message}\n`;
		}, '');
	}

	shouldNotify(warning, dailyWeather) {
		return this.isValidDate(dailyWeather.date, warning.maxDaysUntilEvent)
			&& dailyWeather.rainProbability > warning.minimunProbability
	}

	isValidDate(dateString, days) {
		const limitDate = new Date()
		limitDate.setDate(limitDate.getDate() + days + 1);
		limitDate.setHours(0, 0, 0);

		const date = new Date(`${dateString} 00:00:00`);

		return limitDate - date > 0;
	}

}

module.exports = NotifierJob;
