<template>
<div class="wrapper">
  <div class="places"> <!--class="products" -->
    <div class="place" v-for="place in places" :key="place.id"> <!--class="product" -->
      <div class="info">
        <h1>Memory: {{place.title}}</h1> <!--name-->
        <p>"{{place.description}}"</p>
        <h1>Location:</h1>
        <p> &emsp; &emsp; {{place.country}}</p>
        <p> &emsp; &emsp; {{place.city}}</p>
      </div>
      <div class="image">
         <img :src="place.path"/>
      </div>
      <div class="like"> <!--price-->
        <h1>You can modify your likes</h1>
        <button class="auto" @click="removeItem(place)">Dislike</button> 
      </div>
    </div>
  </div>
</div>
</template>


<script>
import axios from 'axios'; //We first had to install it using npm install axios

export default {
  name: 'PlaceList',
  data() {
    return {
      title: "",
      description: "",//note
      country: "",
      city: "",
      file: null,
      addItem: null,
      places: [],//likes
      findTitle: "", //We'll use findTitle for the title the administrator types in and findItem for the item they click on in the suggestions list.
    }
  },
  created() {
    this.getItems();
  },

  methods: {
    async removeItem(place) {
      try {
        await axios.delete("/api/likes/" + place._id);
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }

        // const index = this.$root.$data.likes.indexOf(place);
        // if(index > -1) {
        //     this.$root.$data.likes.splice(index, 1)// 2nd parameter means remove one item only
        // }
    },

    async getItems() {
      try {
        let response = await axios.get("/api/likes");
        console.log(response.data[0].title);
        this.places = response.data;
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

.places {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.place {
  margin: 10px;
  margin-top: 50px;
  width: 400px;
}

.place img {
  border: 1px solid #12EBC9;
  border-radius: 4.0px;
  height: 450px; /*450px*/
  width: 400px;
  object-fit: cover;
}

.place .image {
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
}

.image:hover {
  /* transform: translate(0, -20px);*/
  filter: drop-shadow(0 0 0.7rem rgba(191, 240, 241, 0.199));
  position:relative;
  max-width: 100%;
  max-height: 100%;
  top:-60px;
  right:1px;
  width:20rem;
  height:auto;
  display:block;
  z-index:999;
  transform: scale(1.1);
}

.info {
  border: 1px solid #12EBC9;
  border-radius: 9.0px;
  line-height: 1.2;
  background-color: transparent;
  color: #ccd6f6;
  padding: 3px 7px;
  height: 6.5em;
}

.info h1 {
  font-size: 23px;
  margin-top: 0px;
  margin-bottom: 0px;
  background-color: transparent;
}

.info h2 {
  font-size: 20px;
  background-color: transparent;
}

.info p {
  margin: 0px;
  font-size: 18px;
  background-color: transparent;
}


.like {
  display: flex;
}

.like p {
  margin: 0px;
  font-size: 20px;
}

.like h1 {
  margin: 0px;
  font-size: 0.9em;
  color: #194e9e;
}

button {
  height: 40px;
  border: none;
  color:rgb(192, 46, 27);
  background-color: transparent;
  border: 1px solid rgb(192, 46, 27);
  border-radius: 3.0px;
  line-height: 1.2;
  padding: 0.1em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  font-weight: 500;
}
button:hover {
  background: #ff646433;
}

.auto {
  margin-left: auto;
}
</style>