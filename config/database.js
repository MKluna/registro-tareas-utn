const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: "miapp.sqlite",
});

module.exports = db;
