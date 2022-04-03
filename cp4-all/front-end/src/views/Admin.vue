<template>
<div class="admin">

  <div class="heading">
    <div class="circle">1</div>
    <h2>Add a Memory</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Enter a memory">
      <p></p>
      <textarea v-model="description" description="description" rows="6" cols="23" placeholder="Enter a discription (optional)">
      </textarea>
      <p></p>
      <input v-model="country" placeholder="Enter a country">
      <p></p>
      <input v-model="city" placeholder="Enter a state or city">
      <p></p>
      <!--We bind the title to a title model, for two-way data binding. 
      We add an event handler for the change event to the input for uploading a file.
      This lets us keep track of which file the user selected.
      We also have an event handler for the click event on an upload button, 
      so that we can upload the photo to our server.-->
      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload" class="button" v-if="emptyness">Upload</button> 
    </div>
    <!--We have a div that will show the title of the item and the photo of the item that we uploaded.
    This will display only after the item is successfully uploaded to the server.-->
    <div class="upload" v-if="addItem">
      <h2>{{addItem.title}}</h2>
      <h1>{{addItem.description}}</h1>
      <h1>{{addItem.country}}</h1>
      <h1>{{addItem.city}}</h1>
      <img :src="addItem.path" />
    </div>
  </div>

  <div class="heading">
    <div class="circle">2</div>
    <h2>Edit/Delete an Item</h2>
  </div>
  <div class="edit">
    <!--The first part of this provides a form where the administrator can type a title.
    We use the v-model directive to bind this to the findTitle property.-->
    <div class="form">
      <input v-model="findTitle" placeholder="Search item">
      <!--
        We will display suggestions in a dropdown menu right below this input.
        We'll simply list them in some div elements and use CSS to style it.
        We will setup a click event handler for when the administrator clicks on one of these suggestions and we'll call the selectItem method.-->
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
        </div>
      </div>
    </div>
    <!--We setup a div to show the item they selected, along with a button they can click to delete this item.
    The property findItem will be bound to the item the user clicked on in the suggestions menu.-->
    <div class="upload" v-if="findItem">
      <input v-model="findItem.title">
      <p></p>
      <textarea v-model="findItem.description" description="description" rows="5" cols="33" placeholder="Enter a discription">
      </textarea>
      <img :src="findItem.path" align="right"/>
    </div>
    <div class="actions" v-if="findItem">
      <button @click="deleteItem(findItem)" class="button">Delete</button>
      <button @click="editItem(findItem)" class="button">Edit</button>
    </div>
  </div>

</div>
</template>


<script>
import axios from 'axios'; //We first had to install it using npm install axios
export default {
  name: 'Admin_',
  data() {
    return {
      title: "",
      description: "",//note
      country: "",
      city: "",
      file: null,
      addItem: null,
      items: [],//memories
      findTitle: "", //We'll use findTitle for the title the administrator types in and findItem for the item they click on in the suggestions list.
      findItem: null,
      empty: false
    }
  },
  created() {
    this.getItems();
  },
  computed: {
    /*This will be triggered whenever the findTitle property changes -- meaning the administrator has typed something 
    in the input field, even a single character. We create a list of suggestions using the filter higher-order function.
    This creates a new list of items that contains only items where the title starts with the string the administrator has typed so far.
    We convert to lowercase when doing the match to provide a case-insensitive match.*/
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    },
    emptyness() {
      if(this.title !== "" && this.country !== "" && this.city !== "") {
        return true; 
      }
      else {
        return false;
      }
    }
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async upload() {//items without a title makes the code freakout 
      try {
        /*
        We create a FormData object and append some information to it.
        This is built in to JavaScript and is what we use to send a file to the server.
        This information includes the property photo that the server will use to get the file from the form, the contents of the file, and the file name.
        */
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        /*
        We then post to /api/photos and include the FormData object.
        Note that we use await to wait for this to finish, and we thus have made upload an async method.
        The return value contains the path on the server where the file is stored.
        */
        let r1 = await axios.post('/api/photos', formData);
        if(this.description == "") { this.description = "no description for this memory"; }
        /*
        Once this first POST is done, we post to /api/items to create the item in our museum, 
        which includes the title and the path to the photo. We again use await here.
        */
        let r2 = await axios.post('/api/items', {
          title: this.title,
          description: this.description, //note, country state city image
          country: this.country,
          city: this.city,
          path: r1.data.path
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);//remember to comment this out when uploading to DigitalOcean
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    /*
    This will clear the input field and set findItem to the item they selected. 
    Because this is not null, the HTML we setup will show the title and photo for the item the administrator chose.
    The delete button will also be displayed.*/
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    /*
    This will use item._id to format the REST API endpoint we want to call.
    Remember, the Mongo database automatically adds an _id field to every document in the database,
    and it contains a long hexadecimal value that uniquely identifies the document.*/
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) { // although the title of image shows if there is actual input it saves as "" nad makes code freakout 
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title, 
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    blankInput() {
      if(this.title !== "" && this.country !== "" && this.city !== "") {
        this.empty == false; 
      }
      else {
        this.epmty == true;
      }
    }
  }
}
</script>


<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
  
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #ccd6f6;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
  color: #ccd6f6;
}

.upload h2 {
  color: #ccd6f6;
}
.upload h1 {
  color: #ccd6f6;
  font-size: 1em;
  margin-top: 0;
}
.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 60%;
  width: 26px;
  height: 26px;
  padding: 1px;
  background: #ccd6f6;
  color: #04633f;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  color:rgb(27, 192, 178) !important;
  font-weight: 200 !important;
  background-color: transparent;
  border: 1px solid #12EBC9;
  border-radius: 3.0px;
  line-height: 1.2;
  padding: 0.1em;
}
.button:hover {
  background: #64ffdb46;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 300px;
  /* border: 1px solid #ccc; */
  color: #ccd6f6;
  text-decoration: none;
}

.suggestion {
  min-height: 22px;
}

.suggestion:hover {
  background-color: #64ffdb46;
  color: #12EBC9;
}
</style>
