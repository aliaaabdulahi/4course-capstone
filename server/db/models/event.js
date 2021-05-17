const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  date: Sequelize.DATE,
  past: Sequelize.BOOLEAN,
  restaurants: Sequelize.ARRAY(Sequelize.TEXT),
  host: Sequelize.INTEGER,
  invitees: Sequelize.ARRAY(Sequelize.TEXT),
});

module.exports = Event;
