const express = require('express');
const routes = express.Router();

const WarningController = require('./controllers/WarningController');
const LoginController = require('./controllers/LoginController');

routes.get('/warnings', WarningController.getAll);
routes.get('/warnings/:id', WarningController.getById);
routes.post('/warnings', WarningController.save);
routes.put('/warnings/:id', WarningController.update);
routes.delete('/warnings/:id', WarningController.delete);

routes.post('/login', LoginController.login);

module.exports = routes;
