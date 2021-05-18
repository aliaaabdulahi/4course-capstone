const router = require("express").Router();
const {
  models: { User, Event, Course },
} = require("../db");
module.exports = router;

// When we save the date+time, we create a new Event.
// When we choose 4 restaurants, put request to the event by ID.
// When we invite users to that event, we bind them to that event
// * create a put request to the event (specified by ID) & set the users to the invites we sent
// * using magic methods to set/add each user to the event.
// When it's time for them to choose their courses, we have a form that autopopulates the restaurant, users,
// courses in drop downs & allows the user to choose their course type & restaruant & type in their course
//this information will be a post request to courses, and then we will have to set the course
// to the respective event in the route.

router.get("/upcoming/userId", async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: {
        userId: req.params.userId,
        past: false,
      },
    });
    res.send(events);
  } catch (err) {
    next(err);
  }
});

router.get("/past/userId", async (req, res, next) => {
  try {
    const events = await Event.findAll({
      where: {
        userId: req.params.userId,
        past: true,
      },
    });
    res.send(events);
  } catch (err) {
    next(err);
  }
});

router.get("/upcoming/userId/eventId/users", async (req, res, next) => {
  try {
    const usersThatBelongToEvent = await Event.findAll({
      include: {
        model: User,
      },
    });
    res.send(usersThatBelongToEvent);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const event = await Event.create({
      date: req.body.date,
      host: req.body.id,
    });
    res.send(event);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const event = await Event.update(
      { date: req.body.date },
      { where: { id: req.body.id } }
    );
    res.send(event);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/restaurants", async (req, res, next) => {
  try {
    console.log("reqbody", req.body);
    const [numberOfAffectedRows, affectedEvents] = await Event.update(
      {
        restaurants: req.body,
      },
      { where: { id: req.params.id } }
    );
    const eventRestaurants = await Event.findByPk(req.params.id);
    res.send(eventRestaurants.restaurants);
  } catch (err) {
    next(err);
  }
});

router.put("/:id/invitees", async (req, res, next) => {
  try {
    console.log("reqbody invitees", req.body);
    const [numberOfAffectedRows, affectedEvents] = await Event.update(
      {
        invitees: req.body,
      },
      { where: { id: req.params.id } }
    );
    const eventInvitees = await Event.findByPk(req.params.id);
    res.send(eventInvitees.invitees);
  } catch (err) {
    next(err);
  }
});

router.get("/:eventId", async (req, res, next) => {
  try {
    let event = await Event.findOne({
      where: {
        id: req.params.eventId,
      },
    });
    res.send(event);
  } catch (error) {
    next(error);
  }
});
