const express = require('express');
const AnswerSessionController = require('../controllers/answersession.controller');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', AnswerSessionController.getAllAnswerSessions);
// создание сессии
router.post('/', AnswerSessionController.createAnswerSession);
router.get('/:id', isValidId, AnswerSessionController.getAnswerSessionById);
// обновление после ответа
router.put('/:id', isValidId, AnswerSessionController.updateAnswerSession);
// получение всех сессиий с вопросами по одной игре(сессии)
router.get('/session/:sessionId', AnswerSessionController.getAnswerSessionBySessionId);

module.exports = router;
