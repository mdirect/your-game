'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Theme extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
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
