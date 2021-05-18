const Sequelize = require("sequelize");
const db = require("../db");

const Course_Event = db.define("course events", {
  invitee: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  course: {
    type: Sequelize.STRING,
  },
});

module.exports = Course_Event;
