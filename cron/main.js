// cron = require('./cronManager.js');
const NotifierJob = require('./notifierJob.js');
const Mailer = require('./mailer.js');
const WeatherApi = require('./climaTempoWeatherApi.js');

// const mailer = new Mailer();
// mailer.setMailOptions(
// 	'justino.jameal@farmoaks.com',
// 	'Teste',
// 	'Teste'
// )

// mailer.send();
// cron.start();

const notifierJob = new NotifierJob(new WeatherApi(), new Mailer());
notifierJob.run();