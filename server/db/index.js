//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/user");
const Event = require("./models/event");
const Course = require("./models/course");
//associations could go here!

User.belongsToMany(Event, { through: "User_Events" });
Course.belongsTo(User);
Course.belongsTo(Event);

Event.belongsToMany(User, { through: "User_Events" });
Event.hasMany(Course);
User.hasOne(Course);

module.exports = {
  db,
  models: {
    User,
    Course,
    Event,
  },
};
