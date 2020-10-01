const express = require('express');
const registerRouter = express.Router();
const CryptoJS = require('crypto-js');

const { verifyNewUserCredentials, handleErrors } = require('../middlewares/Middleware');
const User = require('../data/usersModel');

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
			return res.status(200).json(addedUser);
		})
		.catch((err) => next(err));
});

module.exports = registerRouter;
