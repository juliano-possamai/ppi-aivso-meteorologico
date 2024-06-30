const { User } = require('../models');

const jwt = require('jsonwebtoken');

module.exports = {
	async login(req, res) {
		const { username, password } = req.body;

		const user = await User.findOne({ where: { username: username, password: password } });

		if (!user) {
			return res.status(400).json([{ field: 'username', message: 'Usuário ou senha inválidos' }]);
		}

		const accessToken = jwt.sign({
			username: user.username,
			role: user.role
		}, process.env.ACCESS_TOKEN_SECRET);

		return res.status(200).json({ user: username, accessToken: accessToken });
	}
};
