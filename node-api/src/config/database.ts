import {Sequelize}  from 'sequelize';

export const DataBase = new Sequelize({
  dialect: 'sqlite',
  storage:'Fruit-Shop.db'
});