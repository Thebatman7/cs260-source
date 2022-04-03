<template>
<div>
  <div class="wrapper">
    <div class="search">
      <form class="pure-form">
        <!-- <i class="fas fa-search"></i><input v-model="searchText" placeholder="Search memory..." /> -->
      </form>
    </div>
  </div>
  <PlaceList :places="places" />
</div>
</template>


<!--We could  improve this by reseting the arrya of places when input is zero or null -->

<script>
import axios from 'axios';
import PlaceList from "../components/PlacesList.vue"

export default {
  name: 'Home_',
  components: {
    PlaceList
  },
   data() {
    return {
      searchText: '',//We'll use searchText for the title the user types in and findItem for the item they click on in the suggestions list.
      items: [] //items: []
    }
  },
  //This will run when Vue is loaded on the page and call the getItems function.
  created() {
    this.getItems();
  },
  computed: {//FIX ME
    places() {//We create a list of places using the filter higher-order function.
      //return this.$root.$data.places.filter(place => place.memory.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
      //return this.items.filter(item => item.title.toLowerCase().startsWith(this.searchText.toLowerCase()));
      let items = this.items.filter(place => place.title.toLowerCase().search(this.searchText.toLowerCase()) >= 0);
      
      return items;
    }
  },
  methods: {
    //The getItems method uses the axios library to get the items from the server and store them in items.
    //Because we use await, this needs to be an async method.
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
  
}
</script>


<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search {
  border: 2px solid #12EBC9;
  border-radius: 4px;
  width: 50%;
}

form {
  display: table;
  width: 100%;
}

i {
  display: table-cell;
  padding-left: 10px;
  width: 1px;
  color: #ccd6f6;
}

input {
  display: table-cell;
  font-size: 20px;
  border: none !important;
  box-shadow: none !important;
  width: 100%;
  height: 40px;
  color: #ccd6f6;
}

::placeholder {
  color: #152947;
}
</style>