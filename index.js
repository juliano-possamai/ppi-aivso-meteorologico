const express = require('express');
const db = require('./db/db');

const cors = require('cors');
const cronManager = require('./cron/cronManager');

db.sync().then(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', require('./routes.js'));

const apiPort = 3000;
app.listen(apiPort, () => {
	console.log(`Listening on port ${apiPort}`);
});

cronManager.start();