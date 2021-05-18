//this is the access point for all things database related!
const db = require("./db");

const User = require("./models/user");
const Event = require("./models/event");
const Course = require("./models/course");
const Course_Event = require("./models/course_event")
//associations could go here!

User.hasMany(Event)
Event.belongsTo(User)

Course.belongsToMany(Event, { through: Course_Event });
Event.belongsToMany(Course, { through: Course_Event });


module.exports = {
  db,
  models: {
    User,
    Course,
    Event,
  },
};
