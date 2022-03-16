var resultView = new Vue({
  el: '#app',
  data: {
    awaitingInput: true,
    userInput: "",
    itunesDefaultURL: 'https://itunes.apple.com/search?entity=podcast&&country=US&origin=*&term=',
    itunesGenreSearch: 'https://itunes.apple.com/search?term=podcast&limit=10&genreId=',
    search: '',
    podcastList: [],
  },
  methods: {
    reset() {
      this.podcastList = []
    },

    pressEnter(value) {
      this.reset()
      this.userInput = value
      this.awaitingInput = false

      this.search = this.itunesDefaultURL + value
      // URL can't have spaces, so add '+'
      this.search = this.search.split(' ').join('+')

      axios.get(this.search).then(response1 => { 
        this.loading = false
        this.info = response1
        this.allResultCount = this.info.data.resultCount
        this.resultCount = this.allResultCount
        queryCollectionName = response1.data.results[0].collectionName
        newSearch = this.itunesGenreSearch + response1.data.results[0].genreIds[0]

        axios.get(newSearch).then(response2 => { 
            for (let i = 0; i < 10; i++) {
              podcast = {}; // has collectionName and image
              podcast["collectionName"] = response2.data.results[i].collectionName
              if (response2.data.results[i].artworkUrl600) {
                podcast["image"] = response2.data.results[i].artworkUrl600;
              }
              else {
                podcast["image"] = response2.data.results[i].artworkUrl100;
              }
              podcast["podurl"] = response2.data.results[i].trackViewUrl
              podcast['genres'] = response2.data.results[i].genres
              console.log(podcast['genres'])

              if (podcast["collectionName"] != queryCollectionName) {
                this.podcastList.push(podcast)
              }
            }
            console.log(this.podcastList)

        })
      })

      
    },
  },
})
