//This includes the modules we're using and initializes them.
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//This tells Express that it should serve any files in the public directory as if they were just static files on a web server.
app.use(express.static('public'));

//we use this instead of a database
let tickets = [];
let id = 0;

//This is the REST endpoint for getting all the tickets in the system.
//We just send our list, which by default comes with a 200 OK response.
app.get('/api/tickets', (req, res) => { //notice it is GET
  res.send(tickets);
});

//This is the REST endpoint for creating a new ticket. We get the parameters from the request body, 
//create a new ticket, then send back the same ticket we created in a 200 OK response.
app.post('/api/tickets', (req, res) => {
  id = id + 1;
  let ticket = {
    id: id,
    name: req.body.name,
    problem: req.body.problem
  };
  tickets.push(ticket);
  res.send(ticket);
});

//This is the REST endpoint for deleting a ticket. The ID is passed in the URL so we use a different method to parse it.
//We check whether this ID is present and return a 404 error if it doesn't. Otherwise, we remove it and return 200 OK.
app.delete('/api/tickets/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = tickets.map(ticket => {
      return ticket.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that ticket doesn't exist");
    return;
  }
  tickets.splice(removeIndex, 1);
  res.sendStatus(200);
});

//This starts the server on port 3000.
app.listen(3000, () => console.log('Server listening on port 3000!'));