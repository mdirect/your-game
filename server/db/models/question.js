'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(models) {
      this.belongsTo(models.Theme, { foreignKey: 'themesId' });
      this.hasMany(models.AnswerSession, { foreignKey: 'questionId' });
    }
  }

  Question.init(
    {
      themesId: DataTypes.INTEGER,
      question: DataTypes.STRING,
      image: DataTypes.STRING,
      answer: DataTypes.STRING,
      cost: DataTypes.INTEGER,
      isAnswered: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Question',
    },
  );
  return Question;
};
