const adminAccessMiddleware = (req, res, next) => {
	if (!req.user) {
		return res.sendStatus(401);
	}

	if (req.user.role != 'admin') {
		return res.sendStatus(403);
	}

	return next();
};
module.exports = adminAccessMiddleware;