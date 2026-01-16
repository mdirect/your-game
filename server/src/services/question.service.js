const { Question } = require('../../db/models');

class QuestionService {
  static async getQuestions() {
    return Question.findAll();
  }

  static async getQuestionById(id) {
    return Question.findByPk(id);
  }

  static async getQuestionByThemeId(themesId) {
    return Question.findAll({ where: { themesId }, order: [['cost']] });
  }

  static async getQuestionByThemeAndCost(themesId, cost) {
    return Question.findAll({ where: { themesId, cost } });
  }
}

module.exports = QuestionService;
