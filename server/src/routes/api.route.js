const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const themeRouter = require('./theme.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/themes', themeRouter);

module.exports = router;
