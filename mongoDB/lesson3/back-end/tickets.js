/*
We need to run this command:
export NODE_OPTIONS=--openssl-legacy-provider

before we run other commands like npm run serve, node tickets.js, ...
*/
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// This connects to the Mongo database server and creates or connects to the database called test.
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});


//We create a model for a ticket. We first create a schema
const ticketSchema = new mongoose.Schema({
  name: String,
  problem: String,
});

// Create a virtual parameter that turns the default _id field into id
//We're doing this because by default every document in Mongo has a property called _id,
//but our Express API and our Vue code uses id instead. This lets us easily convert _id into id.
ticketSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
// We also ensure that when documents are serialized into JSON objects that virtual properties are included:
ticketSchema.set('toJSON', {
  virtuals: true
});

// create a model for tickets
const Ticket = mongoose.model('Ticket', ticketSchema);

// Endpoint for reading tickets from the database
// When the server receives a GET request for /api/tickets, it will call the function we supply.
// We use the async keyword when defining this function. This lets us call await for the Mongoose database query.
app.get('/api/tickets', async (req, res) => {
  try {
    console.log("Testing app get");
    // The function is pretty simple, it calls Mongoose using Ticket.find(), which retrieves an array of all 
    //of the tickets in the Ticket collection. All Mongoose functions are Promises, so you can either use 
    //the then/catch syntax or use await. Note that when you use await you should wrap it in a try/catch block to 
    //catch errors.
    let tickets = await Ticket.find();
    // The function takes the array of tickets returned from the database and sends them to the front end using res.send().
    // We send back a JavaScript object, which is converted into JSON when sent.
    res.send({
      tickets: tickets
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// We make an endpoint for creating tickets, which adds tickets to the database
// When the server receives a POST request for /api/tickets, it will call the function we supply
app.post('/api/tickets', async (req, res) => {
  //The function uses Mongoose to create a new Ticket, initializing it with an object that includes a name and a problem.
  //These are taken from the request object req that is sent to the server by the front end
  const ticket = new Ticket({
    name: req.body.name,
    problem: req.body.problem
  });
  try {
    // The function calls ticket.save(), which saves the ticket into the Mongo database.
    await ticket.save();
    // It also sends the ticket to the front end with res.send().
    res.send({
      ticket: ticket
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// We make an endpoint for deleting tickets, which deletes them fron the database
// When the server receives a DELETE request for /api/tickets, it will call the function we supply.
app.delete('/api/tickets/:id', async (req, res) => {
  try {
    // This function uses Mongoose to call Ticket.deleteOne(), which deletes one ticket matching the supplied object.
    // The front end supplies the id of the ticket to be deleted in req.params.id 
    // (the virtual parameter we sent when reading tickets). We map this to _id when supplying an object to deleteOne().
    await Ticket.deleteOne({
      _id: req.params.id
    });
    // The function uses res.sendStatus(200), which returns a 200 OK status code, but no other data to the front end.
    // When we used res.send() previously this also returned 200 OK for the status, but with some data.
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// This tells the server to listen for incoming connections on port 3000
app.listen(3000, () => console.log('Server listening on port 3000!'));
