<template>
<div>
  <Admin v-if="user && user.role === 'admin'" /><!--We use an if-then-else to shown the admin view here-->
  <MyTickets v-if="user" />
  <HomePage v-else />
</div>
</template>

<script>
import axios from 'axios';

import Admin from '@/components/Admin.vue';
import HomePage from '@/components/HomePage.vue'
import MyTickets from '@/components/MyTickets.vue'


export default {
  name: 'home',
  components: {
    HomePage,
    MyTickets,
    Admin
  },
  //This uses axios to access this new endpoint at GET /api/users to get the currently
  //logged in user, and if found, set the user state in the global data storage so all components can use it.
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

