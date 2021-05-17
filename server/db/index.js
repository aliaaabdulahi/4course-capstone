//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/user");
const Event = require("./models/event");
const Course = require("./models/courses");
//associations could go here!
User.belongsTo(Event);
Course.belongsTo(User);
Course.belongsTo(Event);

Event.hasMany(User);
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
