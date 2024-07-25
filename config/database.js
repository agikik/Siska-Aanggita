const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('e-learning-system', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306'
});

module.exports = sequelize;
