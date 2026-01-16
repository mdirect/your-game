const SessionService = require('../services/session.service');

class SessionController {
  static async getAllSessions(req, res) {
    try {
      const { user } = res.locals;
      const sessions = await SessionService.getSessions(user.id);

      return res.status(200).send(sessions);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async getSessionById(req, res) {
    try {
      const { id } = req.params;
      const session = await SessionService.getSessionById(id);

      if (!session) return res.status(200).send('Такой сессии нет');

      return res.status(200).send(session);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async createSession(req, res) {
    try {
      const { user } = res.locals;
      const newSession = await SessionService.createSession({
        userId: user.id,
      });

      return res.status(201).send(newSession);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }

  static async updateSession(req, res) {
    try {
      const { user } = res.locals;
      const { id } = req.params;
      const session = await SessionService.getSessionById(id);

      if (!session) return res.status(200).send('Такой сессии нет');
      if (user.id !== session.userId) return res.status(400).send('Это не ваша сессия');
      const updateSession = await SessionService.finalizeSession(id);

      return res.status(200).json(updateSession);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = SessionController;
