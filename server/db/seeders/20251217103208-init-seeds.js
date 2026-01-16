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
      'Themes',
      [
        {
          title: 'Общие вопросы',
          desc: 'Вопросы общего характера',
        },
        {
          title: '2',
          desc: '2описание',
        },
        {
          title: '3',
          desc: '3описание',
        },
        {
          title: '4',
          desc: '4описание',
        },
        {
          title: '5',
          desc: '5описание',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          themesId: 1,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 100,
        },
        {
          themesId: 1,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 200,
        },
        {
          themesId: 1,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 300,
        },
        {
          themesId: 1,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 400,
        },
        {
          themesId: 1,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 500,
        },
        {
          themesId: 2,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 100,
        },
        {
          themesId: 2,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 200,
        },
        {
          themesId: 2,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 300,
        },
        {
          themesId: 2,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 400,
        },
        {
          themesId: 2,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 500,
        },
        {
          themesId: 3,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 100,
        },
        {
          themesId: 3,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 200,
        },
        {
          themesId: 3,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 300,
        },
        {
          themesId: 3,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 400,
        },
        {
          themesId: 3,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 500,
        },
        {
          themesId: 4,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 100,
        },
        {
          themesId: 4,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 200,
        },
        {
          themesId: 4,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 300,
        },
        {
          themesId: 4,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 400,
        },
        {
          themesId: 4,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 500,
        },
        {
          themesId: 5,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 100,
        },
        {
          themesId: 5,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 200,
        },
        {
          themesId: 5,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 300,
        },
        {
          themesId: 5,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 400,
        },
        {
          themesId: 5,
          question: 'Вопрос',
          answer: 'Ответ',
          cost: 500,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Themes', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
