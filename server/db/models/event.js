const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  event_date: Sequelize.DATE,
  restaurants: Sequelize.ARRAY(Sequelize.TEXT),
});
module.exports = Event;
