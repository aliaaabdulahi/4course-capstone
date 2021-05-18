const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("events", {
  event_date: Sequelize.DATE,
  restaurants: Sequelize.ARRAY(Sequelize.TEXT),
});
module.exports = Event;
