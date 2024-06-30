const express = require('express');
const routes = express.Router();

const WarningController = require('./controllers/WarningController');
const LoginController = require('./controllers/LoginController');

const AuthenticationMiddleware = require('./middlewares/AuthenticationMiddleware.js');
const AdminAccessMiddleware = require('./middlewares/AdminAccessMiddleware.js');

routes.get('/warnings', AuthenticationMiddleware, WarningController.getAll);
routes.get('/warnings/:id', AuthenticationMiddleware, WarningController.getById);
routes.post('/warnings', AuthenticationMiddleware, WarningController.save);
routes.put('/warnings/:id', AuthenticationMiddleware, WarningController.update);
routes.delete('/warnings/:id', AuthenticationMiddleware, AdminAccessMiddleware, WarningController.delete);

routes.post('/login', LoginController.login);

module.exports = routes;
