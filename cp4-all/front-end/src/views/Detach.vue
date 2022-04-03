<template>
<div>
  <div class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="select('United States')" href="#" class="pure-menu-link">United States</a></li>
      <li class="pure-menu-item"><a @click="select('Spain')" href="#" class="pure-menu-link">Spain</a></li>
      <li class="pure-menu-item"><a @click="select('Mexico')" href="#" class="pure-menu-link">Mexico</a></li>
      <li class="pure-menu-item"><a @click="select('Peru')" href="#" class="pure-menu-link">Peru</a></li>
      <li class="pure-menu-item"><a @click="select('Italy')" href="#" class="pure-menu-link">Italy</a></li>
    </ul>
  </div>

  <div v-if="US_selected" class="pure-menu pure-menu-horizontal">
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="selectState('Utah')" href="#" class="pure-menu-link">Utah</a></li>
      <li class="pure-menu-item"><a @click="selectState('Washington')" href="#" class="pure-menu-link">Washington</a></li>
      <li class="pure-menu-item"><a @click="selectState('California')" href="#" class="pure-menu-link">California</a></li>
      <li class="pure-menu-item"><a @click="selectState('Las Vegas')" href="#" class="pure-menu-link">Las Vegas</a></li>
      <li class="pure-menu-item"><a @click="selectState('Ohio')" href="#" class="pure-menu-link">Ohio</a></li>
      <li class="pure-menu-item"><a @click="selectState('Hawaii')" href="#" class="pure-menu-link">Hawaii</a></li>
    </ul>
  </div>
  <PlaceList :places="places" />
</div>
</template>

<script>
import PlaceList from "../components/PlacesList.vue"
export default {
  name: 'Detach_',
  components: {
    PlaceList
  },
  data() {
    return {
      country: '',
      US_selected: false,
      state: '',
    }
  },
  computed: {
    places() {
        if(this.country != '') {
            return this.$root.$data.places.filter(place => place.country === this.country);
        }
        else if(this.state != '') {
            return this.$root.$data.places.filter(place => place.state === this.state);
        }
        return null;
    }
  },
  methods: {
    select(country) {
      if(country == "United States") {
        this.US_selected = true;
        this.country = '';
        this.state = '';
      }
      else {
        this.US_selected = false;
        this.country = country;
      }
    },
    selectState(state) {
        this.state = state;
    }
  }
}
</script>

<style scoped>
.pure-menu-link {
    color:#0a81ff;
    transition: background-position 275ms ease;
}

.pure-menu-link:hover {
    text-decoration: none;
}

.pure-menu-link:after {
    background: transparent;
    color:#12EBC9;
}
.pure-menu-item {
  color:#12EBC9;
}

a {
  /* Same as before */
  transition: background-position 275ms ease;
}
a:hover {
  background-position: 0 100%;
  color: #12EBC9;
  background: transparent;
}
a:active{
    text-decoration: none;
  /* background-position: 0 100%; */
  color: #12EBC9;
  background: transparent !important;
}

</style>