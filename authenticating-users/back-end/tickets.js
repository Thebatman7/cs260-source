//Notice that we are requiring the user module and using some of its exported values.
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

//
// Tickets
//
// This is the schema for a ticket
const ticketSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    problem: String,
    status: {
      type: String,
      default: "open"
    },
    response: {
      type: String,
      default: ""
    },
    created: {
      type: Date,
      default: Date.now
    },
});

const User = users.model;
// The model for a ticket
const Ticket = mongoose.model('Ticket', ticketSchema);
const validUser = users.valid;


// get tickets -- will list tickets that a user has submitted
//We use the validUser middleware to ensure the user is logged in.
//Remember this also sets req.user to the current user's document.
//We can now use Ticket.find() and specify that the tickets must belong to this user. 
//We also sort the responses in descending order of the time they were created (most recent ones first).
router.get('/', validUser, async (req, res) => {
    let tickets = [];
    try {
      if (req.user.role === "admin") {
        tickets = await Ticket.find().sort({
          created: -1
        });
      } else {
        tickets = await Ticket.find({
          user: req.user
        }).sort({
          created: -1
        });
      }
      return res.send({
        tickets: tickets
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});


//We again make sure the user is logged in with the validUser middleware.
//Then we create a ticket, linking it to the user's document with req.user.
//The created property and other properties we don't specify use their default values.
//We save the ticket to the database and then send it back to the front end.
router.post('/', validUser, async (req, res) => {
    const ticket = new Ticket({
      user: req.user,
      problem: req.body.problem,
    });
    try {
      await ticket.save();
      return res.send({
        ticket: ticket
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

//This endpoint only allows administrators to edit tickets -- through a combination of the middleware
//and a role check. Note, we could write additional middleware that does the admin user check for us.
//edit a ticket -- only edits status and response
router.put('/:id', validUser, async (req, res) => {
    // can only do this if an administrator
    if (req.user.role !== "admin") {
      return res.sendStatus(403);
    }
    if (!req.body.status || !req.body.response) {
      return res.status(400).send({
        message: "status and response are required"
      });
    }
    try {
      ticket = await Ticket.findOne({
        _id: req.params.id
      });
      ticket.status = req.body.status;
      ticket.response = req.body.response;
      await ticket.save();
      return res.send({
        ticket: ticket
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
});

// exporting the routes from this module so they can be imported by our main server file in server.js
module.exports = {
    routes: router
}