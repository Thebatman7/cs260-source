let app = new Vue({
    // bind it to the #root div in the DOM
    el: "#root",
    // provide data for bindings
    data: {
        message: 'I really like bread',
        tasks : [{
                description: "Create some loaves of bread",
                completed: true
            },
            {
                description: "Create some fish",
                completed: true
            },
            {
                description: "Create more loaves of bread",
                completed: false,
            },
            {
                description: "Create more fish",
                completed: false
            },
            {
                description: "Create more loaves of bread",
                completed: false
            },
            {
                description: "Tell Peter to clean up the mess",
                completed: false
            }
        ]
    },
    /*
    A computed property is a function that returns a value to use for the property. 
    Vue will automatically track dependencies. So in this case, every time message changes, Vue will recompute screaming.
    */
    computed: {
        /*
        We could manually add a second property for screaming, but keeping it in sync with message would be a pain.
        We will add a computed property:
        */
        screaming() {
            return this.message.toUpperCase();
        },
        incompleteTasks() {
            return this.tasks.filter(task => !task.completed);
        }
    }


    /*
    Computed properties automatically update when the data they depend on changes.
    Computed properties are cached if the data doesn't change. Vue only updates the portion of the DOM that changes.
    */
  });