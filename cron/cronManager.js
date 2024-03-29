const cron = require('node-cron');
const NotifierJob = require('./notifierJob');
const WeatherApi = require('./climaTempoWeatherApi');
const Mailer = require('./mailer');

let everyDayAt9Am = '0 9 * * *';
const cronManager = cron.schedule(everyDayAt9Am, () => {
	const notifierJob = new NotifierJob(new WeatherApi(), new Mailer());
	notifierJob.run();
});

module.exports = cronManager;