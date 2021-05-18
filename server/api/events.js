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

router.post('/', async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    console.log("post", req.body)
    res.send(event)
  } catch (err) {
      next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const event = await Event.update(
      { date: req.body.date },
      { where: { _id: req.body.id } }
    );
    res.send(event);
  } catch (err) {
      next(err);
  }
})

router.get('/:eventId', async (req, res, next) => {
  try {
    let event = await Event.findOne({
      where: {
        id: req.params.eventId,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.send(event);
  } catch (error) {
    next(error);
  }
});