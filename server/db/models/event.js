const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  date: Sequelize.DATE,
});

module.exports = Event;
