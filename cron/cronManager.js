const cron = require('node-cron');
const NotifierJob = require('./notifierJob');
const WeatherApi = require('./climaTempoWeatherApi');
const Mailer = require('./mailer');

let everyDayAt9Am = '0 9 * * *';
let every40seconds = ' */40 * * * * *'
const cronManager = cron.schedule(every40seconds, () => {
	console.log('cron rodando')
	// const notifierJob = new NotifierJob(new WeatherApi(), new Mailer());
	// notifierJob.run();
});

module.exports = cronManager;