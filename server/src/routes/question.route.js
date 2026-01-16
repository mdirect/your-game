const express = require('express');
const QuestionController = require('../controllers/question.controller');
const isValidId = require('../middlewares/isValidId');

const router = express.Router();

router.get('/', QuestionController.getAllQuestions);
router.get('/:id', isValidId, QuestionController.getQuestionById);
router.get('/theme/:themesId', QuestionController.getQuestionByThemeId);
router.get('/theme/:themesId/cost/:cost', QuestionController.getQuestionByThemeAndCost);

module.exports = router;
