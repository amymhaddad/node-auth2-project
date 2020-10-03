const express = require('express');
const registerRouter = express.Router();
const CryptoJS = require('crypto-js');

const { verifyNewUserCredentials, handleErrors } = require('../middlewares/Middleware');
const User = require('../data/usersModel');
const jwt = require('jsonwebtoken');

function newToken(id) {
	const userId = { userId: id}
	return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1800s'})

}


registerRouter.post('/', [ verifyNewUserCredentials, handleErrors ], (req, res, next) => {
	const { username, password, department } = req.body;

	const hashedPassword = CryptoJS.MD5(password).toString();

	const newUserObject = {
		username: username,
		password: hashedPassword,
		department: department
	};

	User.addUser(newUserObject)
		.then((newUser) => {
			const addedUser = { username: newUser.username, department: newUser.department };

			const token = newToken(newUser.id)
			// return res.status(200).json({ token });			// 
			return res.status(200).json(addedUser);
		})
		.catch((err) => next(err));
	 
});

module.exports = registerRouter;
