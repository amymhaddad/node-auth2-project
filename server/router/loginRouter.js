const express = require('express');
const loginRouter = express.Router();

const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const User = require('../data/usersModel');

const { verifyLoginCredentials, handleErrors } = require('../middlewares/Middleware');


//Put .env file in app and ensure the file itself is in the server dir
function newToken(id) {
	const userId = { userId: id };
	return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

loginRouter.post('/', [ verifyLoginCredentials, handleErrors ], (req, res, next) => {
	const hashedPassword = CryptoJS.MD5(req.body.password).toString();
	console.log("IN login", req.body)
	User.getUsername(req.body.username)
		.then((user) => {
			console.log("user", user)
			if (!user) return res.status(404).json({ error: 'User is not found' });
			if (user.password !== hashedPassword) return res.status(403).json({ error: 'Invalid password.' });

			const token = newToken(user.id);
			return res.status(200).json({ token });
		})
		.catch((err) => next(err));
});

module.exports = loginRouter;
