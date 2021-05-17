const router = require("express").Router();
const {
  models: { User, Event, Course },
} = require("../db");
module.exports = router;

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
