'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {
      this.hasMany(models.Question, { foreignKey: 'themesId' });
    }
  }

  Theme.init(
    {
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Theme',
    },
  );
  return Theme;
};
