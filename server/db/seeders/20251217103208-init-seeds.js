'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Дарья',
          email: 'test@ya.ru',
          password: await bcrypt.hash('Qwerty1!', 10),
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Skelets',
      [
        {
          userId: 1,
          name: 'Один',
          description: 'Один описание',
          status: true,
        },
        {
          userId: 1,
          name: 'Два',
          description: 'Два описание',
          status: false,
        },
        {
          userId: 1,
          name: 'Три',
          description: 'Три описание',
          status: false,
        },
        {
          userId: 1,
          name: 'Четыре',
          description: 'Четыре описание',
          status: false,
        },
        {
          userId: 1,
          name: 'Пять',
          description: 'Пять описание',
          status: true,
        },
        {
          userId: 1,
          name: 'Шесть',
          description: 'Шесть описание',
          status: false,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Skelets', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
