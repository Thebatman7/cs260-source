var app = new Vue({
    el: '#app',
    data: {

      todos: [{
        text: "make an app",
        completed: false,
      }, {
        text: "declare victory",
        completed: false,
      }, {
        text: "profit",
        completed: false,
      }],
      message: '',
      show: 'all',
      drag: {},
    },

    /*
    The computed property is called activeTodos. 
    In this computed property, we filter the todo list to return only the items that are not completed.
    This property is cached and recomputed based on its dependencies, which in this case is the todo list.
    Every time this changes, the function is re-evaluated.
    */
    computed: {
        activeTodos() { // This shows no matter if the tasks were checked or not
            return this.todos.filter(item => {
                return !item.completed;
            });
        },
        /*
        The computed property is called filteredTodos. In this computed property, we filter the todo list based on 
        the current state of the show property. You should now be able to show the active, completed, or all items 
        in the list. You should also be able to delete all the completed items with one button click.
        */
        filteredTodos() {
            if(this.show == 'active') {
                return this.todos.filter(item => {
                    return !item.completed;
                });
            }
            if(this.show == 'completed') {
                return this.todos.filter(item => {
                    return item.completed;
                });
            }
            return this.todos;
        },
    },
    methods: {
        addItem() {
            this.todos.push({text: this.message, completed:false});
            this.message = '';
        },
        /*
        This method simply deletes the item from the todos array.
        Notice that the delete button only shows up when we hover over an item.
        This is done in CSS; see if you can find the relevant styles in styles.css.*/
        deleteItem(item) {
            var index = this.todos.indexOf(item);
            if(index > -1) {
                this.todos.splice(index,1);
            }
        },
        showAll() {
            this.show = 'all';
        },
        showActive() {
            this.show = 'active';
        },
        showCompleted() {
            this.show = 'completed';
        },
        deleteCompleted() {
            this.todos = this.todos.filter(item => {
                return !item.completed;
            });
        },
        /*The dragItem method sets the drag property so we can keep track of which item is being dragged.*/
        dragItem(item) {
            this.drag = item;
        },
        /*The dropItem method places the dropped item ahead of the one it is dropped onto.*/
        dropItem(item) {
            const indexItem = this.todos.indexOf(this.drag);
            console.log(this.todos);
            const indexTarget = this.todos.indexOf(item);
            this.todos.splice(indexItem,1);
            console.log(this.todos);
            /*array.splice(index, howmany, item1, ....., itemX) It overwrites the original array.
            index	Required. The position to add/remove items.
            Negative value defines the position from the end of the array.
            howmany	Optional. Number of items to be removed.
            item1, ..., itemX	Optional. New elements(s) to be added.
            */
            this.todos.splice(indexTarget,0,this.drag);
        },
    }
});