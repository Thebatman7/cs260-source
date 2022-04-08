<template>
<div class="main">
  <h2>Logged in as: {{user.firstName}} {{user.lastName}} <button @click="logout" class="pure-button pure-button-primary">Logout</button></h2>
  <h1>Administration</h1>
  <div v-for="ticket in tickets" v-bind:key="ticket.id">
    <Ticket :ticket="ticket" />
  </div>
</div>
</template>


<!--
We import the Ticket component and list it as a child component in the components section.
We use a created() hook to get the list of tickets, and this gets all tickets since we are an administrative user here.
How does the back end know we are an administrative user? It sets a cookie when we log in that contains our user ID. 
The middleware we wrote checks the session for our user ID, then looks up our user record and stores it with our request. 
Now the back end API can check the user record to see if we are an administrator. All this work is done on the back end, 
without code needed on the front end, thanks to cookies.
-->
<script>
import axios from 'axios';
import Ticket from '@/components/Ticket.vue';
export default {
  name: 'Admin',
  components: {
    Ticket
  },
  data() {
    return {
      tickets: [],
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getTickets();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getTickets() {
      try {
        let response = await axios.get("/api/tickets");
        this.tickets = response.data.tickets;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>