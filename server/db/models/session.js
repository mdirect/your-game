'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Session.init(
    {
      userId: DataTypes.INTEGER,
      startTime: DataTypes.DATE,
      endTime: DataTypes.DATE,
      score: DataTypes.INTEGER,
      rigthQuestion: DataTypes.INTEGER,
      totalAnswers: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Session',
    },
  );
  return Session;
};
