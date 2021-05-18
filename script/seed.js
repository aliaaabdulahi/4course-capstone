"use strict";

const {
  db,
  models: { User, Course, Event },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ email: "cody@cody.com", username: "cody", password: "123" }),
    User.create({ email: "murphy@m.com", username: "murphy", password: "123" }),
    User.create({ email: "abc@mail.com", username: "acb", password: "123" }),
    User.create({ email: "edc@mail.com", username: "edc", password: "123" }),
  ]);

  // Creating course
  const courses = await Promise.all([
    Course.create({ invitee: "cody@cody.com", courseType: "appetizer"}),
    Course.create({ invitee: "murphy@m.com", courseType: "entree" }),
    Course.create({ invitee: "abc@mail.com", courseType: "dessert"}),
    Course.create({ invitee: "edc@mail.com", courseType: "drinks"}),
  ]);

    // Creating event
    const events = await Promise.all([
      Event.create({ date: "2021-05-10 03:09:19-04"}),
    ]);
  
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  await events[0].setCourses([courses[0], courses[1], courses[2], courses[3]]);
  await events[0].setUser(users[3])

  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
