const Sequelize = require("sequelize");
const db = require("../db");

const User_Event = db.define("user-event", {
  invitees: Sequelize.ARRAY(Sequelize.INTEGER),
});

module.exports = User_Event;
