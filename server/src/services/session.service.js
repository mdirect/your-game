const { Session } = require('../../db/models');

class SessionService {
  static async getSessions(id) {
    return Session.findAll({ where: { userId: id }, order: [['createdAt', 'DESC']] });
  }

  static async getSessionById(id) {
    return Session.findByPk(id);
  }

  static async createSession({ userId }) {
    return Session.create({ userId });
  }

  static async updateSession(id, { endTime, score, rigthQuestion, totalAnswers }) {
    await Session.update(
      { endTime, score, rigthQuestion, totalAnswers },
      { where: { id } },
    );

    return Session.findByPk(id);
  }
}

module.exports = SessionService;
