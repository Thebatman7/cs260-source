var express = require('express');
var fs = require('fs'); //module to help reading the file
var router = express.Router();



//route directed to our index.html
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { rooot: 'public' });
});



//route for getcity
router.get('/getcity', function(req, res, next) {
  console.log("We are in getcity route, sir.");
  //we will use a regular expression to be able to search for specific cities that being with a certain prefix
  var myRe = new RegExp("^" + req.query.q); 
  console.log(myRe);
  //used to read the data in the file
  fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
    if(err) throw err;
    var cities = data.toString().split("\n");
    var jsonresult = [];
    for(var i = 0; i < cities.length; i++) {
      //we use that RegEx to search that array of cities that is returned from reading the file
      var result = cities[i].search(myRe);
      if(result != -1) { 
        console.log(cities[i]);
        //we store those cities inside a JSON array to send back
        jsonresult.push({city:cities[i]});
      }
    }
    console.log(jsonresult);
    res.status(200).json(jsonresult);
  });
});


module.exports = router;
