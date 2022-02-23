"use strict";

var previousMemes = [];

document.getElementById('getButton').addEventListener('click', function(event) {
  event.preventDefault();

  fetch("https://programming-memes-images.p.rapidapi.com/v1/memes", { 
    "method": "GET", "headers": {
		"x-rapidapi-host": "programming-memes-images.p.rapidapi.com",
		"x-rapidapi-key": "bd57dfd811msh3051ffb93632837p1b5de8jsne13fc94c7f20" }
  })
  .then(response => response.json())
  .then(json => {
    console.log('Success:', json);
    if(arraysAreIdentical(previousMemes, json)) {
      let message = "<div class=\"item\"> <p>Sorry memes are precious we have recieved the same set of memes. Try again.</p> </div>";
      document.getElementById("memes").innerHTML= message;
    }
    else {
      previousMemes = json;
      let message = "<div class=\"item\"> <p>Let's get you some memes...</p> </div>";
      document.getElementById("memes").innerHTML= message;
      let meme = "";
      for (let i=0; i < json.length; i++) {
        meme += "<div class=\"item\">";
        let source = json[i].image
        meme += "<img class=\"memeImage\"src=\"" + source + "\">";
        meme += "</div>";
      }
      if(meme !== null) {
        document.getElementById("memes").innerHTML= meme;
      }
      else {
        console.log('Probelm with string:', meme);
      }
    }
    json = None;
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

function arraysAreIdentical(arr1, arr2){
  if (arr1.length !== arr2.length) return false;
  for (var i = 0, len = arr1.length; i < len; i++){
      if (arr1[i] !== arr2[i]){
          return false;
      }
  }
  return true; 
}