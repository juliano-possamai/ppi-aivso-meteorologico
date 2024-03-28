const cron = require('node-cron');

const task = cron.schedule('*/10 * * * * *', () => {
	console.log('Tarefa executada a cada 10 segundos');
});

module.exports = task;