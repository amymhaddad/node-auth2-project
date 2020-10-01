const express = require('express');
const router = express.Router();

const usersRouter = require('./usersRouter');
const registerRouter = require('./registerRouter');
const loginRouter = require('./loginRouter');

router.use('/users', usersRouter);
router.use('/register', registerRouter);
router.use('/login', loginRouter);

module.exports = router;
