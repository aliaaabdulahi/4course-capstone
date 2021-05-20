function randomizer(users, restaurants) {
  let usersWithCourse = {};
  const courses = ["drinks", "appetizer", "entree", "dessert"];
  for (let i = 0; i < users.length; i++) {
    let currentUser = users[i];
    var randomIndex = Math.floor(Math.random() * courses.length);
    var course = courses.splice(randomIndex, 1)[0];
    var restaurant = courses.splice(randomIndex, 1)[0]["yelpName"];
    usersWithCourse[currentUser].course = course;
    usersWithCourse[currentUser].restaurant = restaurant;
  }
  return usersWithCourse;
}

// console.log(randomizer(["alia", "ezgi", "annie", "shiyang"]);

module.exports = { randomizer };
