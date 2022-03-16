<template>
<div>
  <h1>Current Tickets</h1>
  <div v-for="ticket in tickets" v-bind:key="ticket.id">
    <hr>
    <div class="ticket">
      <div class="problem">
        <p>{{ticket.problem}}</p>
        <p><i>-- {{ticket.name}}</i></p>
      </div>
      <button @click="deleteTicket(ticket)">Delete</button>
    </div>
  </div>
</div>
</template>


<!--Uses the axios library to fetch data from the back end instead of from the global data structure-->
<script>
import axios from 'axios';
export default {
  name: 'home',
  //Notice that we store tickets as a property on the data object for the view
  data() {
    return {
      tickets: [],
    }
  },
  //To load the current set of tickets when the page is loaded, we use a created() function. Think of this as initializing Vue for this page.
  //This method calls getTickets(), which is defined in the methods section.
  created() {
    this.getTickets();
  },
  methods: {
    //This calls axios.get to get the data from our server's REST API and then store the returned tickets in this.tickets.
    //It uses await to wait for this to happen instead of the older Promise .then syntax.
    async getTickets() {
      try {
        let response = await axios.get("/api/tickets");
        this.tickets = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    //This method uses the REST API to delete a ticket.
    //We supply the specific ID of the ticket we are deleting by appending it to the URL.
    //Notice that we get this ticket ID from index.html. When we iterate through the list of tickets using v-for, 
    //we can pass ticket to the deleteTicket method.
    async deleteTicket(ticket) {
      try {
        await axios.delete("/api/tickets/" + ticket.id);
        this.getTickets();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
