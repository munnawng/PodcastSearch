var resultView = new Vue({
  el: '#app',
  data: {
    awaitingInput: true,
    userInput: "",
    itunesDefaultURL: 'https://itunes.apple.com/search?entity=podcast&&country=US&origin=*&term=',
    itunesGenreSearch: 'https://itunes.apple.com/search?term=podcast&limit=10&genreId=',
    applePodcastsDefaultURL: 'https://podcasts.apple.com/us/podcast/apple-events/',
    overcastDefaultURL:'https://overcast.fm/itunes',
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
              podcast["image"] = response2.data.results[i].artworkUrl100
              podcast["podurl"] = response2.data.results[i].trackViewUrl

              let urlString = response2.data.results[i].trackViewUrl
              let idx = urlString.lastIndexOf("id")
              let id = urlString.slice(idx, idx + 12) //id can be size 9 or 10
              let idstring = urlString.substr(idx + 12, 1) != '?' ? urlString.slice(idx, idx + 11) : urlString.slice(idx, idx + 12)
              podcast["id"] = idstring
              podcast["opodurl"] = this.overcastDefaultURL + idstring.substr(2); //removes id

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
