const User = require("./User.js");
const { DataTypes } = require("sequelize");
const db = require("../config/database.js");

const Task = db.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.STRING,
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Task.belongsTo(User);
User.hasMany(Task);

module.exports = Task;
