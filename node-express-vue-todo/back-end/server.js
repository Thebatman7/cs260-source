//This is the boilerplate we'll use for a Node and Express back end. We first load the modules we need. 
const express = require('express');
const bodyParser = require('body-parser');

//We create an Express app
const app = express();




//We configure the body parser library so that it will parse forms and JSON requests.
app.use(bodyParser.urlencoded({// parse application/x-www-form-urlencoded
  extended: false
}));
app.use(bodyParser.json());// parse application/json

//instead of database
let items = [];
let id = 0;


//We support requests to create a todo list item by accepting a POST request on /api/items.
//This request should send two fields: text and completed. 
//We'll also add an id field, which we will increment each time a new item is added. 
//This will let us edit items by specifying the item id.
app.post('/api/items', (req, res) => { //CREATE
    id = id + 1;
    //Creating a new item in the todo list is as simple as creating a new object and then pushing it onto the array.
    //We send back a 200 OK with the created item in the body of the response. The item will get converted to JSON.
    let item = {
      id: id,
      text: req.body.text,
      completed: req.body.completed
    };
    items.push(item);
    res.send(item);
});

//We just send the entire array in a response. It will get converted into JSON, with a 200 OK response code.
app.get('/api/items', (req, res) => { //READ
    res.send(items);
});

//In a REST API, we use a PUT request when we want to update an item.
//The URL will include the item id, such as /api/items/5 to edit item number 5.
//Node will put this parameter into req.params.id.
app.put('/api/items/:id', (req, res) => { //UPDATE
    let id = parseInt(req.params.id);
    //We will not assume that the items are ordered in the items array by their id.
    //So to find an item with a given id we will create an itemsMap, which is an array that contains just the item ids. 
    let itemsMap = items.map(item => {
      return item.id;
    });
    //We can search through this array using indexOf
    let index = itemsMap.indexOf(id);
    //We return an error if the item isn't found. Like with other requests, we return a 200 OK and send the item back.
    if (index === -1) {
      res.status(404)
        .send("Sorry, that item doesn't exist");
      return;
    }
    //We can then search through this array using indexOf.
    //Once we have the item we want, we use the text and completed fields from req.body to change the item.
    let item = items[index]; //contacting our "database"
    item.text = req.body.text;
    item.completed = req.body.completed;
    res.send(item);
});


//We again have the id of the item in the URL, and we get it from req.params.id.
app.delete('/api/items/:id', (req, res) => { //DELETE
    let id = parseInt(req.params.id);
    //we can't assume the array is sorted by id, so we create a second array that contains item ids 
    //and then search with indexOf to find the item with the item we're looking for.
    let removeIndex = items.map(item => {
        return item.id;
    }).indexOf(id); //Notice similar to find the index in above method .put
    if (removeIndex === -1) {
      res.status(404).send("Sorry, that item doesn't exist");
      return;
    }
    items.splice(removeIndex, 1);//???
    res.sendStatus(200);
});

//We start the server on port 300
app.listen(3000, () => console.log('Server listening on port 3000, sir.'));