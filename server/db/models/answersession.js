'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnswerSession extends Model {
    static associate(models) {
      this.belongsTo(models.Question, { foreignKey: 'questionId' });
      this.belongsTo(models.Session, { foreignKey: 'sessionId' });
    }
  }

  AnswerSession.init(
    {
      sessionId: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      userAnswer: DataTypes.STRING,
      isCorrect: DataTypes.BOOLEAN,
      questionId: DataTypes.INTEGER,
      answerScore: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'AnswerSession',
    },
  );
  return AnswerSession;
};
