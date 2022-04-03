<template>
<div>
  <!-- <h1 class="header"> You liked {{numLikedItems}} memories </h1>   -->
  <LikedItems/>
</div>
</template>

<script>
import LikedItems from "../components/LikedItems.vue"
//import axios from 'axios';

export default {
  name: 'Likes_',
  components: {
    LikedItems
  },
  
  data() {
    return {
      alikes: []
    }
  },
  // computed: {
    // likes() { //This cart that we are going to pass to <ProductList :products="cart" />
    //   return this.alikes;
    // },
    // numLikedItems() {
    //   console.log(this.alikes.length);
    //   return this.places.length;
    // },
  // },
}
</script>

<style scoped>
.header{
    color: #007bff;
}
</style>