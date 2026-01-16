const express = require('express');
const SessionController = require('../controllers/session.controller');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', verifyAccessToken, SessionController.getAllSessions);
// создание сессии
router.post('/', verifyAccessToken, SessionController.createSession);
router.get('/:id', isValidId, SessionController.getSessionById);
// обновление после финала
router.put('/:id', isValidId, verifyAccessToken, SessionController.updateSession);

module.exports = router;
