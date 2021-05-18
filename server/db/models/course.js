const Sequelize = require("sequelize");
const db = require("../db");

const Course = db.define("courses", {
  restaurant: {
    type: Sequelize.STRING,
    //allowNull: false,
  },
  courseType: {
    type: Sequelize.ENUM("drinks", "appetizer", "entree", "dessert"),
    allowNull: false,
  },
  // courseSelection: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  invitee: {
    type: Sequelize.STRING,
  },
});

module.exports = Course;
