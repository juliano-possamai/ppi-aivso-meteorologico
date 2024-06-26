const jwt = require('jsonwebtoken');
const accessTokenSecret = '21f2ed0f5f562bbc35b323af494a98434975fd82';

module.exports = {
	async login(req, res) {
		const { username, password } = req.body;

		// const user = users.find(u => { return u.username === username && u.password === password });

		// if (!user) {
		// 	return res.status(400).json([{ field: 'username', message: 'Usuário ou senha inválidos' }]);
		// }

		const user = { username: 'admin', role: 'admin' };
		if (username !== 'admin' || password !== 'admin') {
			return res.status(400).json([{ field: 'username', message: 'Usuário ou senha inválidos' }]);
		}

		const accessToken = jwt.sign({
			username: user.username,
			role: user.role
		}, accessTokenSecret);

		return res.status(200).json({ user: username, accessToken: accessToken });
	}
};
