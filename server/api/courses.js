// When we save the date+time, we create a new Event.
// When we choose 4 restaurants, put request to the event by ID.
// When we invite users to that event, we bind them to that event
// * create a put request to the event (specified by ID) & set the users to the invites we sent
// * using magic methods to set/add each user to the event.
// When it's time for them to choose their courses, we have a form that autopopulates the restaurant, users,
// courses in drop downs & allows the user to choose their course type & restaruant & type in their course
//this information will be a post request to courses, and then we will have to set the course
// to the respective event in the route.

const router = require("express").Router();
const { Op } = require("sequelize");
const {
  models: { User, Event, Course },
} = require("../db");
module.exports = router;

router.post("/:eventId", async (req, res, next) => {
  try {
    const courseObj = req.body;
    for (let key in courseObj) {
      console.log(req.params.eventId);
      let user = await User.findOne({ where: { email: key } });
      let courseInfo = courseObj[key];
      let course = await Course.create({
        userId: user.id,
        eventId: req.params.eventId,
        courseType: courseInfo.course,
        restaurant: courseInfo.restaurant,
      });
    }
    res.send("loading");
  } catch (err) {
    next(err);
  }
});
