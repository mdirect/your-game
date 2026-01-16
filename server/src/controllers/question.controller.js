const QuestionService = require('../services/question.service');

class QuestionController {
  static async getAllQuestions(req, res) {
    try {
      const questions = await QuestionService.getQuestions();

      return res.status(200).send(questions);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getQuestionById(req, res) {
    try {
      const { id } = req.params;
      const question = await QuestionService.getQuestionById(id);

      if (!question) return res.status(200).send('Такого вопроса нет');

      return res.status(200).send(question);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getQuestionByThemeId(req, res) {
    try {
      const { themesId } = req.params;
      const question = await QuestionService.getQuestionByThemeId(themesId);

      if (!question) return res.status(200).send('Такого вопроса нет');

      return res.status(200).send(question);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getQuestionByThemeAndCost(req, res) {
    try {
      const { themesId, cost } = req.params;
      const question = await QuestionService.getQuestionByThemeAndCost(themesId, cost);

      if (!question) return res.status(200).send('Такого вопроса нет');

      return res.status(200).send(question);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = QuestionController;
