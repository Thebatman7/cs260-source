let app = new Vue({
    // bind it to the #root div in the DOM
    el: "#root",
    // provide data for bindings
    data: {
      names: ['Emma', 'Brandon', 'Lucy', 'Jorge'],
      newName: ''
    },
    // custom methods
    methods: {
        //addNames will add the value of the newValue property to the list of names
        addName() {
            if(this.newName === '') // This doesn't account for spaces and this doesn't work when enter is pressed
                return;
            this.names.push(this.newName);
            this.newNAme = "";
        }
    }

    /*
    We add the newName property to the data object. We add the addName method in a methods object. It can use this.newName to reference the property for the new name and this.names to reference the property for the names.
    You should now be able to add names to the list.
    You can bind any JavaScript event this way.
    Notice:
    You can also use this syntax in index.html to bind the method: <button @click="addName">Add Name</button>
    Notice the use of @ instead of v-on.
    */
  });