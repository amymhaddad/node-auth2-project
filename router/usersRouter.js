const express = require('express');
const usersRouter = express.Router();

const User = require('../data/usersModel');
const { verifyToken, handleErrors } = require('../middlewares/Middleware');

usersRouter.get('/', [ verifyToken, handleErrors ], (req, res, next) => {
    const userId = req.user;
    console.log("User in Router", req.user)

	User.getUser(userId)
		.then((user) => {
			if (!user) {
				return res.status(401).json({ error: 'User is not found' });
			}
			const userDepartment = user.department;

			User.getDepartment(userDepartment).then((matchingDepartments) => {
				if (!matchingDepartments) {
					return res.status(401).json({ error: 'There are no other users with matching departments' });
				}
				return res.status(200).json(matchingDepartments);
			});
		})
		.catch((err) => next(err));
});

module.exports = usersRouter;
