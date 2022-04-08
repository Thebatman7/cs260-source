const reader = require("readline-sync");
const mongoose = require('mongoose');
const users = require("./users.js");

const User = users.model;

// connect to Mongo
mongoose.connect('mongodb://127.0.0.1:27017/pagliaccio', {//217.0.0.1 = localhost
  useUnifiedTopology: true,
  useNewUrlParser: true
});


// get the needed info
let firstName = reader.question("First name: ");
let lastName = reader.question("Last name: ");
let username = reader.question("Username: ");
const password = reader.question("Password: ", {
  hideEchoBack: true
});

if (firstName === "" || lastName === "" || username === "" || password === "") {
  console.log("You need to enter a first name, last name, username, and password");
  process.exit();
}

User.findOne({
  username: username
}).then((user) => {
  if (user) {
    console.log("That username already exists");
    process.exit();
  }
}).then(() => {
  let user = new User({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: password,
    role: "admin"
  });
  user.save().then(() => {
    console.log("OK, admin user created for", firstName, lastName, "with username", username);
    process.exit();
  });
}).catch(error => {
  console.log(error);
});