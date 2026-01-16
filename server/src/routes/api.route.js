const express = require('express');
const authRouter = require('./auth.route');
const userRouter = require('./user.route');
const themeRouter = require('./theme.route');
const questionRouter = require('./question.route');
// const sessionRouter = require('./session.route');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/theme', themeRouter);
router.use('/question', questionRouter);
// router.use('/session', sessionRouter);

module.exports = router;
