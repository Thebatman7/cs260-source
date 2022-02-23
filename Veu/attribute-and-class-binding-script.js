let app = new Vue({
    // bind it to the #root div in the DOM
    el: "#root",
    // provide data for bindings
    data: {
      title: 'Brought to you by JavaScript',
      className: 'red', //There needs to be a style called red in the css file for this to work
      isLoading: true
    },
    methods: {
        toggleLoading() {
            this.isLoading = !this.isLoading;
        }
    }
  });