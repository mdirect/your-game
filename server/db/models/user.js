'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Skelet, { foreignKey: 'userId' });
    }

    static validateEmail(email) {
      const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
      return emailPattern.test(email);
    }

    static validatePassword(password) {
      const hasUpperCase = /[A-Z]/;
      const hasLowerCase = /[a-z]/;
      const hasNumbers = /\d/;
      const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
      const isValidLength = password.length >= 8;

      if (
        !hasUpperCase.test(password) ||
        !hasLowerCase.test(password) ||
        !hasNumbers.test(password) ||
        !hasSpecialCharacters.test(password) ||
        !isValidLength
      ) {
        return false;
      }

      return true;
    }

    static validateLoginData({ email, password }) {
      if (
        !email ||
        typeof email !== 'string' ||
        email.trim().length === 0 ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          err: 'Email не должен быть пустым и должен быть валидным',
        };
      }

      if (
        !password ||
        typeof password !== 'string' ||
        password.trim().length === 0 ||
        !this.validatePassword(password)
      ) {
        return {
          isValid: false,
          err: 'Пароль не должен быть пустым, должен содержать хотя бы одну цифру, одну заглавную букву, одну строчную букву, один специальный символ и быть не менее 8 символов',
        };
      }

      return {
        isValid: true,
        err: null,
      };
    }

    static validateSignUpData({ name, email, password }) {
      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return {
          isValid: false,
          err: 'Поле name не должно быть пустым',
        };
      }

      if (
        !email ||
        typeof email !== 'string' ||
        email.trim().length === 0 ||
        !this.validateEmail(email)
      ) {
        return {
          isValid: false,
          err: 'Email должен быть валидным',
        };
      }

      if (
        !password ||
        typeof password !== 'string' ||
        password.trim().length === 0 ||
        !this.validatePassword(password)
      ) {
        return {
          isValid: false,
          err: 'Пароль не должен быть пустым, должен содержать одну большую букву, одну маленькую, один специальный символ, и не должен быть короче 8 символов',
        };
      }

      return {
        isValid: true,
        err: null,
      };
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
