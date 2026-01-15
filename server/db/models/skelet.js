'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skelet extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
    }

    static validate({ name, description }) {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return {
          isValid: false,
          err: 'Наименование должно быть не пустой строкой',
        };
      }
      if (
        !description ||
        typeof description !== 'string' ||
        description.trim().length === 0
      ) {
        return {
          isValid: false,
          err: 'Описание должно быть не пустой строкой',
        };
      }
      return {
        isValid: true,
        err: null,
      };
    }
  }

  Skelet.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Skelet',
    },
  );
  return Skelet;
};
