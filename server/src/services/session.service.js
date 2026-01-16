const { Session, AnswerSession, Question } = require('../../db/models');

class SessionService {
  static async getSessions(id) {
    return Session.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getSessionById(id) {
    return Session.findByPk(id);
  }

  static async createSession({ userId }) {
    await Question.update({ isAnswered: false }, { where: {} });
    return Session.create({
      userId,
      score: 0,
      rigthQuestion: 0,
      totalAnswers: 0,
    });
  }

  static async updateSession(id, { endTime, score, rigthQuestion, totalAnswers }) {
    await Session.update(
      { endTime, score, rigthQuestion, totalAnswers },
      { where: { id } },
    );

    return Session.findByPk(id);
  }

  static async finalizeSession(id) {
    const answers = await AnswerSession.findAll({ where: { sessionId: id } });
    const totalAnswers = answers.filter((a) => a.userAnswer).length;
    const rigthQuestion = answers.filter((a) => a.isCorrect).length;
    const score = answers.reduce((sum, a) => sum + (a.answerScore || 0), 0);
    const questionIds = answers.map((a) => a.questionId).filter(Boolean);

    await Session.update(
      {
        endTime: new Date(),
        score,
        rigthQuestion,
        totalAnswers,
      },
      { where: { id } },
    );

    if (questionIds.length) {
      await Question.update(
        { isAnswered: false },
        { where: { id: questionIds } },
      );
    }

    return Session.findByPk(id);
  }
}

module.exports = SessionService;
