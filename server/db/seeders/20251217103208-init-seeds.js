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
          title: 'История',
          desc: 'Ключевые события и даты',
        },
        {
          title: 'Наука',
          desc: 'Открытия, формулы, факты',
        },
        {
          title: 'География',
          desc: 'Страны, города, природные объекты',
        },
        {
          title: 'Культура',
          desc: 'Кино, литература, музыка',
        },
        {
          title: 'Спорт',
          desc: 'Соревнования и достижения',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Questions',
      [
        {
          themesId: 1,
          question: 'В каком году человек впервые высадился на Луну?',
          answer: '1969',
          cost: 100,
        },
        {
          themesId: 1,
          question: 'Кто был первым президентом США?',
          answer: 'Джордж Вашингтон',
          cost: 200,
        },
        {
          themesId: 1,
          question: 'В каком году началась Вторая мировая война?',
          answer: '1939',
          cost: 300,
        },
        {
          themesId: 1,
          question: 'Как называется реформа Петра I по изменению календаря?',
          answer: 'Введение юлианского календаря (1700 год)',
          cost: 400,
        },
        {
          themesId: 1,
          question: 'Какое государство первым запустило спутник Земли?',
          answer: 'СССР',
          cost: 500,
        },
        {
          themesId: 2,
          question: 'Сколько планет в Солнечной системе?',
          answer: '8',
          cost: 100,
        },
        {
          themesId: 2,
          question: 'Как называется единица измерения силы тока?',
          answer: 'Ампер',
          cost: 200,
        },
        {
          themesId: 2,
          question: 'Кто сформулировал законы движения?',
          answer: 'Исаак Ньютон',
          cost: 300,
        },
        {
          themesId: 2,
          question: 'Как называется наука о строении вещества на атомном уровне?',
          answer: 'Квантовая физика',
          cost: 400,
        },
        {
          themesId: 2,
          question: 'Какой химический элемент обозначается символом Fe?',
          answer: 'Железо',
          cost: 500,
        },
        {
          themesId: 3,
          question: 'Столица Канады?',
          answer: 'Оттава',
          cost: 100,
        },
        {
          themesId: 3,
          question: 'Самая длинная река мира?',
          answer: 'Нил',
          cost: 200,
        },
        {
          themesId: 3,
          question: 'Где находится пустыня Сахара?',
          answer: 'В Африке',
          cost: 300,
        },
        {
          themesId: 3,
          question: 'Как называется самая высокая гора в мире?',
          answer: 'Эверест (Джомолунгма)',
          cost: 400,
        },
        {
          themesId: 3,
          question: 'В какой стране находится город Киото?',
          answer: 'Япония',
          cost: 500,
        },
        {
          themesId: 4,
          question: 'Кто написал «Войну и мир»?',
          answer: 'Лев Толстой',
          cost: 100,
        },
        {
          themesId: 4,
          question: 'Как называется самая известная картина Леонардо да Винчи?',
          answer: 'Мона Лиза',
          cost: 200,
        },
        {
          themesId: 4,
          question: 'Кто режиссер фильма «Титаник» (1997)?',
          answer: 'Джеймс Кэмерон',
          cost: 300,
        },
        {
          themesId: 4,
          question: 'Какая группа исполняет песню «Bohemian Rhapsody»?',
          answer: 'Queen',
          cost: 400,
        },
        {
          themesId: 4,
          question: 'Как называется театр в Москве на Театральной площади?',
          answer: 'Большой театр',
          cost: 500,
        },
        {
          themesId: 5,
          question: 'Сколько игроков одновременно на поле в футбольной команде?',
          answer: '11',
          cost: 100,
        },
        {
          themesId: 5,
          question: 'В какой стране прошли первые современные Олимпийские игры?',
          answer: 'Греция',
          cost: 200,
        },
        {
          themesId: 5,
          question: 'Сколько периодов в хоккейном матче?',
          answer: '3',
          cost: 300,
        },
        {
          themesId: 5,
          question: 'Как зовут самого титулованного пловца Олимпиады?',
          answer: 'Майкл Фелпс',
          cost: 400,
        },
        {
          themesId: 5,
          question: 'В каком виде спорта используется термин «гран-при»?',
          answer: 'Формула-1',
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
