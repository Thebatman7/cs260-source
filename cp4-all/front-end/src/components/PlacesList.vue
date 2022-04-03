<template>
<div class="wrapper">
  <div class="places"> <!--class="products" -->
    <div class="place" v-for="place in places" :key="place.id"> <!--class="product" -->
      <div class="info">
        <h1> Memory: {{place.title}}</h1> <!--name-->
        <p>"{{place.description}}"</p>
        <h1>Location:</h1>
        <p> &emsp; &emsp; {{place.country}}</p>
        <p> &emsp; &emsp; {{place.city}}</p>
      </div>
      <div class="image">
        <img :src="place.path"/>
      </div>
      <div class="like"> <!--price-->
        <h1>Add to your Pangaea</h1>
        <button class="auto" @click="addToBucketList(place)">Bucket list</button> <!--<button class="auto">Add to Cart</button>-->
        <button class="auto" @click="addToLikes(place)">Like</button> 
      </div>
    </div>
  </div>
</div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'PlaceList',
  data() {
    return {
     places: [],
    }
  },
  //This will run when Vue is loaded on the page and call the getItems function.
  created() {
    this.getItems();
  },
  methods: {
    //The getItems method uses the axios library to get the items from the server and store them in items.
    //Because we use await, this needs to be an async method.
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.places = response.data; //this.items
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async addToLikes(place) { //we should not be able to add the same item multiple times
      try {
        let r1 = await axios.get('api/likes/' + place._id);
        console.log(r1.data.title);
        await axios.post('/api/likes', {
          title: place.title,
          description: place.description,
          country: place.country,
          city : place.city,
          path: place.path
        });
      } catch (error) {
        console.log(error);
      }
    },
    async addToBucketList(place) { //we should not be able to add the same item multiple times
      try {
        let r1 = await axios.get('api/blist/' + place._id);
        console.log(r1.data.title);
        await axios.post('/api/blist', {
          title: place.title,
          description: place.description,
          country: place.country,
          city: place.city,
          path: place.path
        });
      } catch (error) {
        console.log(error);
      }
    }
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
  filter: drop-shadow(0 0 0.9rem rgba(130, 186, 223, 0.685));
  /* position:relative; */
  max-width: 100%;
  max-height: 100%;
  top:-60px;
  right:1px;
  width:40rem;
  height:auto;
  display:block;
  z-index:999;
  transform: scale(1.3);
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
  color:rgb(27, 192, 178);
  background-color: transparent;
  border: 1px solid #12EBC9;
  border-radius: 3.0px;
  line-height: 1.2;
  padding: 0.1em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  font-weight: 500;
}
button:hover {
  background: #64ffdb46;
}
button:disabled,
button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
.auto {
  margin-left: auto;
}
</style>