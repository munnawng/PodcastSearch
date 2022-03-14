// var resultView = new Vue({
//   el: '#app',
//   data: {
//     awaitingInput: true,
//     userInput: "",
//   },
//   methods: {
//     pressEnter(value) {
//       this.userInput = value
//       this.awaitingInput = false

//       console.log(value)
//     },
//   },
// })

var resultView = new Vue({
  el: '#app',
  data: {
    artist1: './img/1.jpg',
    querytext: '',
    results: null,
    display: [],
    dispRecord: [], 
    artist2: './img/2.jpg',
    searchActive: 'none',
    allBtn: true,
    n: null,
    genres: null,
    genreList: [],
    sortPrice: false,
    currentAudio: null,
    alphSort: false,
    priceSort: false,
    isLoading: false,
    awaitingInput: true,
    },  
  methods: {
   sorter: function (){
      this.$refs.ORIGINAL.className = "";
      this.$refs.PRICE.className = "active";
      this.$refs.COLLECTION.className = "";
      this.priceSort = true;
      this.alphSort = false;
      if (!this.dispRecord.length){
        this.dispRecord = this.display.slice();
      }
      this.display.sort(function(a,b) {
        if ( a.trackPrice > b.trackPrice) {
          return 1;
        }
        if ( a.trackPrice < b.trackPrice) {
          return -1;
        }
        return 0;
      });
   },

   alphabeticSorter: function (){
      this.$refs.ORIGINAL.className = "";
      this.$refs.PRICE.className = "";
      this.$refs.COLLECTION.className = "active";
      this.alphSort = true;
      this.priceSort = false;
      if (!this.dispRecord.length){
        this.dispRecord = this.display.slice();
      }
      this.display.sort(function(a,b) {
        if ( a.collectionName > b.collectionName) {
          return 1;
        }
        if ( a.collectionName < b.collectionName) {
          return -1;
        }
        return 0;
      });
   },

   originalSort: function () {
      this.$refs.ORIGINAL.className = "active";
      this.$refs.PRICE.className = "";
      this.$refs.COLLECTION.className = "";
      if (!this.dispRecord.length){
        return this.display;
      }
      else{
        this.display = this.dispRecord.slice();
      }
   },

   genreClick: function(genre) {
      if (genre == 'all') {
        this.$refs.ALL.className = "btn btn-success";
          for (i in this.genreList) {
            var gen = this.genreList[i];
            this.$refs[gen][0].className = "btn";
          }
        this.genreList = [];
      }
      else if (this.genreList.includes(genre)) {
        var index = this.genreList.indexOf(genre);
        this.genreList.splice(index,1);
        this.$refs[genre][0].className = "btn";
        if (this.genreList.length === 0) { this.$refs.ALL.className = "btn btn-success" };
      }
      else {
        this.genreList.push(genre);
        this.$refs[genre][0].className = "btn btn-primary";
        this.$refs.ALL.className = "btn";
        if (this.genreList.length == this.genres.size) {
          this.allBtn = true;
          for (i in this.genreList) {
            var gen = this.genreList[i];
            this.$refs[gen][0].className = "btn";
          }
          this.genreList = [];
          this.$refs.ALL.className = "btn btn-success";
        }
        else{
          this.allBtn = false;
        }
      }
      if (this.priceSort) {
        this.display.sort(function(a,b) {
          if ( a.trackPrice > b.trackPrice) {
            return 1;
          }
          if ( a.trackPrice < b.trackPrice) {
            return -1;
          }
          return 0;
        });
      }
      else if (this.alphSort) {
        this.display.sort(function(a,b) {
        if ( a.collectionName > b.collectionName) {
          return 1;
        }
        if ( a.collectionName < b.collectionName) {
          return -1;
        }
        return 0;
      });
      }

      if (!this.genreList.length){
        this.display = this.results;
        this.n = this.display.length
        return
      } 

      var tempDisp = [];
      for (i in this.results) {
        if (this.genreList.includes(this.results[i].primaryGenreName)){
            tempDisp.push(this.results[i]);
        }
      }

      this.display = tempDisp;
      this.n = this.display.length
   },

   filter_genre(item) {
    if (item) {
      if (this.genreList.includes(item.primaryGenreName)){
        return true;
      }
    }
      return false;
   },

   play_song(event) {
      if (event.target.innerHTML == 'Pause'){
       this.currentAudio.pause(); 
       event.target.innerHTML = 'Play';
      }
      else{
        var src = event.target.id;
        event.target.innerHTML = 'Pause';
        if (this.currentAudio) {
          this.currentAudio.pause(); 
        }
        this.currentAudio = new Audio(src);
        this.currentAudio.play();
      }
   },

   search_text() {
    this.awaitingInput = false;
    if (this.querytext == "this american life") {
      var query = 'Society & Culture'
    }
    else if (this.querytext=='money talks') {
      var query = 'money'
    }
    else{
      var query = this.querytext;
    }
    this.genres = new Set();
    axios.interceptors.request.use(config => {
      this.isLoading=true;
      return config;
    });
    axios.interceptors.response.use(response => {
      this.isLoading=false;
      return response;
    });
    axios.get('https://itunes.apple.com/search', { params: { term: query, origin: '*', attribute: 'genreIndex', media:'podcast'}})
      .then(response => {
        this.results = response['data']['results'];
        this.display = this.results;
        console.log("FOR GRADERS - iTunes API RESPONSE:");
        console.log(response);
        this.searchActive = 'inline';
        this.n = response['data']['resultCount'];
        for (var i in this.results){
            this.genres.add(this.results[i].primaryGenreName);
        }
        if (response['data']['resultCount'] === 0) {
          alert('No artists found');
        }
      })
      .catch(function (error) {
        //failure
        alert('No response from iTunes API. Check your internet connection');
        console.log(error);
      })
      //always
      .then(function () {
      });
   }
  }
})
