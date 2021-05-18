const Sequelize = require("sequelize");
const db = require("../db");

const Event = db.define("event", {
  date: Sequelize.DATE,
  past: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  restaurants: Sequelize.ARRAY(Sequelize.TEXT),
  host: Sequelize.INTEGER,
  invitees: Sequelize.ARRAY(Sequelize.TEXT),
});

module.exports = Event;
