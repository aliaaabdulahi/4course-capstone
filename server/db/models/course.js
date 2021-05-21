const Sequelize = require("sequelize");
const db = require("../db");

const Course = db.define("courses", {
  courseType: {
    type: Sequelize.ENUM("drinks", "appetizer", "entree", "dessert"),
    allowNull: false,
  },
  restaurant: Sequelize.TEXT,
  // courseSelection: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
});

module.exports = Course;
