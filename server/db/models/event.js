const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("events", {
  date: Sequelize.DATE,
  past: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  restaurants: Sequelize.ARRAY(Sequelize.TEXT),
  invitees: Sequelize.ARRAY(Sequelize.TEXT),
  host: Sequelize.BOOLEAN,
});
module.exports = Event;
