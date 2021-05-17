function randomizer(users) {
  let usersWithCourse = {};
  const courses = ["drinks", "appetizer", "entree", "dessert"];
  for (let i = 0; i < users.length; i++) {
    let currentUser = users[i];
    var randomIndex = Math.floor(Math.random() * courses.length);
    var course = courses.splice(randomIndex, 1)[0];
    usersWithCourse[currentUser] = course;
  }
  return usersWithCourse;
}

console.log(randomizer(["alia", "ezgi", "annie", "shiyang"]));

module.exports = { randomizer };
