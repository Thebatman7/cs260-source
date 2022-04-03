<template>
<div>
  <!-- <h1 class="header"> You have {{numBucketItems}} items in your bucket list:</h1>   -->
  <BucketItems :places="bucket_list" />
</div>
</template>

<script>
import BucketItems from "../components/BucketItems.vue"

export default {
  name: 'Bucket_',
  components: {
    BucketItems
  },
  
  data() {
    return {
    }
  },
  computed: {
    bucket_list() { //This items is what we are going to pass to <BucketItems :places="bucket_list" />
      return this.$root.$data.bucket_list;
    },
    numBucketItems() {
        return this.$root.$data.bucket_list.length;
    }
  },
}
</script>

<style scoped>
.header{
  color: #077dfc;
}
</style>