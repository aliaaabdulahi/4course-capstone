const Sequelize = require("sequelize");
const db = require("../db");

const User_Events = db.define("user events", {
  host: {
    type: Sequelize.INTEGER,
  },
  invitee: {
    type: Sequelize.INTEGER,
  },
  course: {
    type: Sequelize.STRING,
  },
});

module.exports = User_Events;
