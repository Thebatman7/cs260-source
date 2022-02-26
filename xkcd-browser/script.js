Vue.component('star-rating', VueStarRating.default) //global Vue component

let app = new Vue({
    el: '#app',
    data: {
      number: '',
      max: '',
      current: {
        title: '',
        img: '',
        alt: '',
      },
      loading: true,
      addedName: '',
      addedComment: '',
      comments: {},
      ratings: {},
      rated: false,
    },
    created() {
      this.xkcd();
    },

    computed: {
        month() {
          var month = new Array;
          if (this.current.month === undefined)
            return '';
          month[0] = "January";
          month[1] = "February";
          month[2] = "March";
          month[3] = "April";
          month[4] = "May";
          month[5] = "June";
          month[6] = "July";
          month[7] = "August";
          month[8] = "September";
          month[9] = "October";
          month[10] = "November";
          month[11] = "December";
          return month[this.current.month - 1];
        }
    },

    watch: {
        number(value, oldvalue) {
            if(oldvalue === '') {
                this.max = value;//The max is simply the number fetched the first time we load the page.
            }
            else {
                this.xkcd();
            }
        },
    },

    methods: {
        /* The first load data from the XKCD API. We've done this with fetch in JavaScript before, but this time we're going to use the axios library.
        This is a popular library for sending AJAX requests. One complication is that the official XKCD API does not use CORS, so this will result in a CORS error. 
        To avoid this, we'll use an unofficial, but CORS-enabled XKCD API.*/
        async xkcd() {
            try {
              this.loading = true;
              let url = 'https://xkcd.now.sh/?comic=';
              if (this.number === '') {
                url += 'latest';
              } else {
                url += this.number;
              }
              const response = await axios.get(url);
              this.current = response.data;
              this.loading = false;
              this.number = response.data.num;
            } catch (error) {
              console.log(error);
            }
        },
        // xkcd() {
        //     this.loading = true;
        //     let url = 'https://xkcd.now.sh/?comic=';
        //     if (this.number === '') {
        //         url += 'latest';
        //     } else {
        //         url += this.number;
        //     }
        //     axios.get(url) //returns a promise that resolved when the fetch completes
        //     .then(response => {
        //         this.current = response.data;
        //         return true;
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     });
        // },
        previousComic() {
            this.number = this.current.num - 1;
            if (this.number < 1)
                this.number = 1;
            this.rated = false;   
        },
        nextComic() {
            this.number = this.current.num + 1;
            if (this.number > this.max)
                this.number = this.max
            this.rated = false;
        },
        getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
        },
        randomComic() {
            this.number = this.getRandom(1, this.max);
        },
        firstComic() {
            this.number = 1;
        },
        lastComic() {
            this.number = this.max;
        },
        /*This method needs to add a new array to the comments object whenever the first comment is made for a given comic.
        We can't add it the usual way because Vue has to be able to track changes to comments. Instead, we have to use Vue.set to add the array.
        Once this is done, we can use standard JavaScript to push the new comment into the array.*/
        addComment() {
            if (!(this.number in this.comments))
              Vue.set(app.comments, this.number, new Array);
            this.comments[this.number].push({
              author: this.addedName,
              text: this.addedComment,
              dateTime: moment().format('MMMM Do YYYY, h:mm:ss a'),
            });
            this.addedName = '';
            this.addedComment = '';
        },
        setRating(rating){
            //we need to check whether the object has a rating yet
            if (!(this.number in this.ratings))
                //we need to use Vue.set to setup a new property in an object so that Vue will track it
                Vue.set(this.ratings, this.number, {
                    sum: 0,
                    total: 0
                });
            //we can set properties on this ratings object
            this.ratings[this.number].sum += rating;
            this.ratings[this.number].total += 1;
            this.ratings[this.number].average = this.ratings[this.number].sum / this.ratings[this.number].total;
            this.rated = true;
        }
    }
  });