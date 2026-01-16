const AnswerSessionService = require('../services/answersession.service');
const QuestionService = require('../services/question.service');

class AnswerSessionController {
  static async getAllAnswerSessions(req, res) {
    try {
      const answerSessions = await AnswerSessionService.getAnswerSessions();

      return res.status(200).send(answerSessions);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getAnswerSessionById(req, res) {
    try {
      const { id } = req.params;
      const answerSession = await AnswerSessionService.getAnswerSessionById(id);

      if (!answerSession) return res.status(200).send('Такой сессии с вопросом нет');

      return res.status(200).send(answerSession);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getAnswerSessionBySessionId(req, res) {
    try {
      const { sessionId } = req.params;
      const answerSession = await AnswerSessionService.getAnswerSessionBySessionId(
        sessionId,
      );

      if (!answerSession) return res.status(200).send('Такой сессии с вопросом нет');

      return res.status(200).send(answerSession);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async createAnswerSession(req, res) {
    try {
      const { sessionId, questionId } = req.query;
      const newAnswerSession = await AnswerSessionService.createAnswerSession({
        sessionId,
        questionId,
      });

      return res.status(201).send(newAnswerSession);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async updateAnswerSession(req, res) {
    try {
      const { id } = req.params;
      const answerSession = await AnswerSessionService.getAnswerSessionById(id);

      if (!answerSession) return res.status(200).send('Такой сессии с вопросом нет');
      if (!req.body) return res.status(400).send('Заполни данные');

      const { userAnswer } = req.body;
      const answer = await QuestionService.getQuestionById(
        answerSession.dataValues.questionId,
      );

      if (answer.dataValues.isAnswered || answer.dataValues.isAnswered === null)
        return res.status(400).send('Вопрос уже отвечен');
      const normalizedUser = String(userAnswer ?? '')
        .trim()
        .toLowerCase();
      const normalizedCorrect = String(answer.dataValues.answer ?? '')
        .trim()
        .toLowerCase();
      const isCorrect = normalizedUser === normalizedCorrect;
      const updateAnswerSession = await AnswerSessionService.updateAnswerSession(id, {
        userAnswer,
        isCorrect,
        answerScore: isCorrect ? answer.dataValues.cost : -1 * answer.dataValues.cost,
      });

      await QuestionService.isAnswered(answerSession.dataValues.questionId);

      return res.status(200).json(updateAnswerSession);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = AnswerSessionController;
