// function randomizer(users) {
//   let usersWithCourse = {};
//   const courses = ["drinks", "appetizer", "entree", "dessert"];
//   for (let i = 0; i < users.length; i++) {
//     let currentUser = users[i];
//     var randomIndex = Math.floor(Math.random() * courses.length);
//     var course = courses.splice(randomIndex, 1)[0];
//     usersWithCourse[currentUser] = course;
//   }
//   return usersWithCourse;
// }

// console.log(randomizer(["alia", "ezgi", "annie", "shiyang"]));

// module.exports = { randomizer };

function randomizer(users, restaurants) {
  let usersWithCourse = {};
  const courses = ["drinks", "appetizer", "entree", "dessert"];
  for (let i = 0; i < users.length; i++) {
    let currentUser = users[i];
    usersWithCourse[currentUser] = {};
    var randomIndex = Math.floor(Math.random() * courses.length);
    var course = courses.splice(randomIndex, 1)[0];
    var restaurant = restaurants.splice(randomIndex, 1)[0];
    usersWithCourse[currentUser].course = course;
    usersWithCourse[currentUser].restaurant = JSON.parse(restaurant).yelpName;
    usersWithCourse[currentUser].email = users[i];
  }
  return usersWithCourse;
}

// console.log(randomizer(["alia", "ezgi", "annie", "shiyang"], ["{\"yelpId\":\"dVzEAnyh1697gGSz16y-7A\",\"yelpName\":\"Cousins Maine Lobster - Boston\"}","{\"yelpId\":\"Ra0kfOGmGDo_tUx95lUaTQ\",\"yelpName\":\"Dunkin'\"}","{\"yelpId\":\"EYmmUQqCTu2M2LzZJW3PuQ\",\"yelpName\":\"My Grandma's of New England\"}","{\"yelpId\":\"jeBWFhPRJr4GdSpMMsd7Nw\",\"yelpName\":\"Kiku Curry\"}"]);

module.exports = { randomizer };
