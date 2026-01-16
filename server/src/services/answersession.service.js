const { AnswerSession } = require('../../db/models');

class AnswerSessionService {
  static async getAnswerSessions() {
    return AnswerSession.findAll();
  }

  static async getAnswerSessionById(id) {
    return AnswerSession.findByPk(id);
  }

  static async getAnswerSessionBySessionId(sessionId) {
    return AnswerSession.findAll({ where: { sessionId } });
  }

  static async createAnswerSession({ sessionId, questionId }) {
    return AnswerSession.create({ sessionId, questionId });
  }

  static async updateAnswerSession(id, { userAnswer, isCorrect, answerScore }) {
    await AnswerSession.update({ userAnswer, isCorrect, answerScore }, { where: { id } });

    return AnswerSession.findByPk(id);
  }
}

module.exports = AnswerSessionService;
