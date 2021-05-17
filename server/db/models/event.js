const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  date: Sequelize.DATE,
  past: Sequelize.BOOLEAN,
});

module.exports = Event;
