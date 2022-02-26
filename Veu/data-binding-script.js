//This tells Vue that it can change the DOM inside of the #root div. It also creates a data object that it can use in data bindings.
let app = new Vue ({
    //bind it to the #root
    el: "#root",
    // provide data for bindings
    data: {
        message: "Hello there!",
    }

});