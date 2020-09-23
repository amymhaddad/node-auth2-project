const jwt = require('jsonwebtoken');

module.exports = {
	verifyNewUserCredentials,
	verifyLoginCredentials,
	verifyToken,
	handleErrors
};

function verifyNewUserCredentials(req, res, next) {
	const { username, password, department } = req.body;
	if (!username || !password || !department)
		return res.status(404).json({ error: 'You need to include all required fields' });
	next();
}

function verifyLoginCredentials(req, res, next) {
	const { username, password } = req.body;
	if (!username || !password) return res.status(404).json({ error: 'You need to provide a username and password' });
	next();
}

function verifyToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token === null) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
		if (error) return res.sendStatus(403);
        req.user = user.userId;
		next();
	});
}

function handleErrors(err, req, res, next) {
	return res.status(500).json({ message: 'Server error' });
}
