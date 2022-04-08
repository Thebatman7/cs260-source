const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// setup express
const app = express();

// setup body parser middleware to conver to JSON and handle URL encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the mongodb database. The name of the database is pagliaccio.
mongoose.connect('mongodb://127.0.0.1:27017/pagliaccio', { //localhost = 127.0.0.1
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// import the users module and setup its API path endpoints
const users = require("./users.js");
app.use("/api/users", users.routes);

// import the tickets module and setup its API path
// by doing this we convert the / route inside of tickets.js into /api/tickets.
const tickets = require("./tickets.js");
app.use("/api/tickets", tickets.routes);


// listen on port 3000
app.listen(3000, () => console.log('Sir, server listening on port 3000!'));