const jwt = require('jsonwebtoken');

const express = require('express');
const routes = express.Router();

const WarningController = require('./controllers/WarningController');
const LoginController = require('./controllers/LoginController');

const authenticateJWT = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res.sendStatus(401);
	}

	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		if (error) {
			return res.sendStatus(403);
		}

		req.user = user;
		return next();
	});
};

routes.get('/warnings', authenticateJWT, WarningController.getAll);
routes.get('/warnings/:id', authenticateJWT, WarningController.getById);
routes.post('/warnings', authenticateJWT, WarningController.save);
routes.put('/warnings/:id', authenticateJWT, WarningController.update);
routes.delete('/warnings/:id', authenticateJWT, WarningController.delete);

routes.post('/login', LoginController.login);

module.exports = routes;
