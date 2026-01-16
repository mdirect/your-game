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

  static async isAnswered(id) {
    await Question.update({ isAnswered: true }, { where: { id } });

    return Question.findByPk(id);
  }

  static async changeStatusIsAnswered(id) {
    await Question.update({ isAnswered: false }, { where: { id } });

    return Question.findByPk(id);
  }
}

module.exports = QuestionService;
