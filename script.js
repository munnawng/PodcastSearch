var resultView = new Vue({
  el: '#app',
  data: {
    awaitingInput: true,
    userInput: "",
    itunesDefaultURL: 'https://itunes.apple.com/search?entity=podcast&&country=US&origin=*&term=',
    itunesGenreSearch: 'https://itunes.apple.com/search?term=podcast&limit=10&genreId=',
    spotifySearch: 'https://open.spotify.com/search/',
    search: '',
    podcastList: [],
    copy_podcastList: [],
    renderKey:0,
    genreDict: {}, // key=name of genre, val=0 if the corresponding sort button is not clicked and 1 if it is
    randomPodcasts_all: [{ collectionName:"ID10T with Chris Hardwick", genres:["Comedy Interviews","Comedy","TV & Film"], image:"https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/4a/dd/40/4add407f-c0bb-2eb2-2c14-2fc695e94254/mza_17759441340856837215.jpeg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/id10t-with-chris-hardwick/id355187485?uo=4", podurl2:"https://open.spotify.com/search/ID10T%20with%20Chris%20Hardwick" }, 
                     { collectionName:"Wait Wait... Don't Tell Me!" , genres:["Comedy","Leisure"] , image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/07/8c/f9/078cf90d-1268-5e0c-1957-dd8875ee84b7/mza_15153281774076462897.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/wait-wait-dont-tell-me/id121493804?uo=4", podurl2:"https://open.spotify.com/search/Wait%20Wait...%20Don%27t%20Tell%20Me%21" },
                     { collectionName:"Monday Morning Podcast", genres:["Comedy"], image:"https://is5-ssl.mzstatic.com/image/thumb/Podcasts124/v4/04/d4/f5/04d4f532-cb53-9770-47c9-110414741950/mza_10493561346513613273.jpg/600x600bb.jpg", podurl: "https://podcasts.apple.com/us/podcast/monday-morning-podcast/id480486345?uo=4", podurl2:"https://open.spotify.com/search/Monday%20Morning%20Podcast" },
                     { collectionName:"Revisionist History", genres:["Society & Culture"], image:"https://is3-ssl.mzstatic.com/image/thumb/Podcasts112/v4/5f/a5/31/5fa53178-8efc-5bbf-2cb2-88eac2f7a7a4/mza_8828738869024330911.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/revisionist-history/id1119389968?uo=4", podurl2:"https://open.spotify.com/search/Revisionist%20History" },
                     { collectionName:"Up and Vanished", genres:["True Crime","Society & Culture","Personal Journals"], image:"https://is5-ssl.mzstatic.com/image/thumb/Podcasts112/v4/7a/d3/a5/7ad3a5da-bb56-a499-48ce-5e85b55be5e1/mza_14782461286831788767.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/up-and-vanished/id1140596919?uo=4", podurl2:"https://open.spotify.com/search/Up%20and%20Vanished" },
                     { collectionName:"This American Life", genres:["Personal Journals","Society & Culture","Arts"], image:"https://is1-ssl.mzstatic.com/image/thumb/Podcasts123/v4/4e/b9/bb/4eb9bb9b-ed19-f0b7-7739-1177f1b35207/mza_8452563123961176873.png/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/this-american-life/id201671138?uo=4", podurl2:"https://open.spotify.com/search/This American Life" },
                     { collectionName:"Raging Bullets : A DC Comics Fan Podcast", genres:["Visual Arts","Arts","Leisure","Hobbies"], image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts4/v4/1d/ea/31/1dea3105-b08a-c31b-4690-2d670a314fb6/mza_538716459684874643.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/raging-bullets-a-dc-comics-fan-podcast/id135709448?uo=4", podurl2:"https://open.spotify.com/search/Raging Bullets : A DC Comics Fan Podcast" },
                     { collectionName:"Lets Talk Trains", genres:["Hobbies","Leisure"], image:"https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/ee/f8/97/eef897eb-07a2-9c07-814c-11cb430a8909/mza_13049948788779245044.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/lets-talk-trains/id302184794?uo=4", podurl2:"https://open.spotify.com/search/Lets Talk Trains" },
                     { collectionName:"GardenFork.TV Make, Fix, Grow, Cook", genres:["Hobbies","Leisure","Arts","Food"], image:"https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/30/4a/0a/304a0a53-36dc-4358-cbea-1d11a6ef83c0/mza_15940133230891257629.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/gardenfork-tv-make-fix-grow-cook/id184237813?uo=4", podurl2:"https://open.spotify.com/search/GardenFork.TV Make, Fix, Grow, Cook" },
                     { collectionName:"TED Radio Hour", genres:["Technology","Science","Social Sciences"], image:"https://is3-ssl.mzstatic.com/image/thumb/Podcasts126/v4/61/a5/89/61a58912-45de-a8bb-6fec-ce2700c8a1c4/mza_3535135275300695932.png/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/ted-radio-hour/id523121474?uo=4", podurl2:"https://open.spotify.com/search/TED Radio Hour" },
                     { collectionName:"Mac OS Ken", genres:["Technology"], image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/60/d8/34/60d8347a-25dd-2669-8c15-7c9ccc8c32a0/mza_17056708008047026265.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/mac-os-ken/id120867842?uo=4", podurl2:"https://open.spotify.com/search/Mac OS Ken" },
                     { collectionName:"Reply All", genres:["Technology","Society & Culture","Documentary"], image:"https://is4-ssl.mzstatic.com/image/thumb/Podcasts116/v4/c9/79/bf/c979bfd8-0366-effb-66ab-58e41c35e6c4/mza_10297816036296753741.jpeg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/reply-all/id941907967?uo=4", podurl2:"https://open.spotify.com/search/Reply All" },
                     { collectionName:"Giant Bombcast", genres:["Video Games","Leisure","Technology"], image:"https://is3-ssl.mzstatic.com/image/thumb/Podcasts115/v4/e5/a8/83/e5a88390-2329-e115-7754-db0747d23d17/mza_13724690258390935620.png/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/giant-bombcast/id274450056?uo=4", podurl2:"https://open.spotify.com/search/Giant Bombcast" },
                     { collectionName:"Truthers: Tiffany Dover Is Dead*", genres:["News","Technology"], image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/c6/6f/dc/c66fdc30-1f42-23eb-0352-41e136b3fa1d/mza_2071369956979420902.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/truthers-tiffany-dover-is-dead/id1618512442?uo=4", podurl2:"https://open.spotify.com/search/Truthers: Tiffany Dover Is Dead*" },
                     { collectionName:"TechStuff", genres:["Technology","News","Tech News"], image:"https://is3-ssl.mzstatic.com/image/thumb/Podcasts116/v4/05/67/32/056732a3-6ae4-8b4c-5c1a-dcf029871705/mza_13620152238816948296.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/techstuff/id282795787?uo=4", podurl2:"https://open.spotify.com/search/TechStuff" },
                     { collectionName:"Hidden Brain", genres:["Social Sciences","Science","Arts","Performing Arts"], image:"https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/be/f9/c6/bef9c6e2-540d-9280-2f2d-efa607b853eb/mza_17258756779490255928.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/hidden-brain/id1028908750?uo=4", podurl2:"https://open.spotify.com/search/Hidden Brain" },
                     { collectionName:"Snap Judgment", genres:["Performing Arts","Arts"], image:"https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/a5/9b/5e/a59b5e7b-3c34-21ef-78e9-fcd793736f34/mza_15136833304156123998.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/snap-judgment/id283657561?uo=4", podurl2:"https://open.spotify.com/search/Snap Judgment" },
                     { collectionName:"Here's The Thing with Alec Baldwin", genres:["Music Interviews","Music","Arts","Performing Arts"], image:"https://is5-ssl.mzstatic.com/image/thumb/Podcasts126/v4/c0/59/78/c05978e9-ced9-2d1f-b45c-0d3d229a0f5a/mza_15253999773912500974.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/heres-the-thing-with-alec-baldwin/id472939437?uo=4", podurl2:"https://open.spotify.com/search/Here's The Thing with Alec Baldwin" },
                     { collectionName:"The NoSleep Podcast", genres:["Science Fiction","Fiction","Arts","Performing Arts"], image:"https://is5-ssl.mzstatic.com/image/thumb/Podcasts126/v4/e4/d6/9e/e4d69e66-eb45-41dc-f8d7-16c99af47f35/mza_7527545725586525880.jpeg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/the-nosleep-podcast/id444083093?uo=4", podurl2:"https://open.spotify.com/search/The NoSleep Podcast" },
                     { collectionName:"Bertcast", genres:["Comedy","Arts","Performing Arts"], image:"https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/a8/8f/44/a88f4441-d1e8-9fa4-8675-933d432d50fd/mza_7527152381825087821.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/bertcast/id585103759?uo=4", podurl2:"https://open.spotify.com/search/Bertcast" },
                     { collectionName:"Snap Judgment Presents: Spooked", genres:["Performing Arts","Arts"], image:"https://is4-ssl.mzstatic.com/image/thumb/Podcasts126/v4/a7/78/2f/a7782f15-40b0-abff-a61a-5763642c3615/mza_11620579570792855217.png/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/snap-judgment-presents-spooked/id1279361017?uo=4", podurl2:"https://open.spotify.com/search/Snap Judgment Presents: Spooked" },
                     { collectionName:"Selected Shorts", genres:["Performing Arts","Arts","Books"], image:"https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/91/d9/49/91d94982-f624-3020-f422-159477f840ca/mza_5792715952810243168.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/selected-shorts/id253191824?uo=4", podurl2:"https://open.spotify.com/search/Selected Shorts" },
                     { collectionName:"The Bill Simmons Podcast", genres:["Sports"], image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts122/v4/a1/ec/6a/a1ec6a57-3d52-47e3-2325-5a9356e63cca/mza_2307341105736919865.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/the-bill-simmons-podcast/id1043699613?uo=4", podurl2:"https://open.spotify.com/search/The Bill Simmons Podcast" },
                     { collectionName:"Pardon My Take", genres:["Football","Sports"], image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts125/v4/8f/7c/00/8f7c003e-7a57-123e-b5a3-09fa9690e0bc/mza_5633253483920864681.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/pardon-my-take/id1089022756?uo=4", podurl2:"https://open.spotify.com/search/Pardon My Take" },
                     { collectionName:"The Dan Patrick Show", genres:["Sports","Comedy"], image:"https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/62/61/50/62615095-4923-f345-b6ae-e66e9b88188f/mza_2758763205313019427.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/the-dan-patrick-show/id279241099?uo=4", podurl2:"https://open.spotify.com/search/The Dan Patrick Show" },
                     { collectionName:"Fantasy Focus Football", genres:["Fantasy Sports","Sports"], image:"https://is5-ssl.mzstatic.com/image/thumb/Podcasts116/v4/51/4a/c2/514ac297-2705-0b3b-333c-e2f19ac0b8e6/mza_10320394643866116589.jpeg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/fantasy-focus-football/id260537420?uo=4", podurl2:"https://open.spotify.com/search/Fantasy Focus Football" },
                     { collectionName:"The Fighter & The Kid", genres:["Sports","Society & Culture"], image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts126/v4/b9/6f/2a/b96f2a09-1a29-2de0-a126-e5a96ceab06f/mza_6514535339250041450.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/the-fighter-the-kid/id706421907?uo=4", podurl2:"https://open.spotify.com/search/The Fighter & The Kid" },
                     { collectionName:"The Herd with Colin Cowherd", genres:["Football","Sports","Basketball"], image:"https://is5-ssl.mzstatic.com/image/thumb/Podcasts112/v4/0f/ef/9d/0fef9d06-760b-156f-09fa-a7004401cdd9/mza_8924320401442889165.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/the-herd-with-colin-cowherd/id1042368254?uo=4", podurl2:"https://open.spotify.com/search/The Herd with Colin Cowherd" },
                     { collectionName:"The Dan Le Batard Show with Stugotz", genres:["Sports"], image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts116/v4/e9/8c/51/e98c510a-8c65-15ce-6974-bb71c8fbd9ba/mza_18013515939135680500.jpeg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/the-dan-le-batard-show-with-stugotz/id934820588?uo=4", podurl2:"https://open.spotify.com/search/The Dan Le Batard Show with Stugotz" },
                     { collectionName:"Fantasy Footballers - Fantasy Football Podcast", genres:["Fantasy Sports","Sports","Football"], image:"https://is2-ssl.mzstatic.com/image/thumb/Podcasts126/v4/fd/93/79/fd937998-28f9-1a25-9373-cba172bc21d1/mza_10884797523080152919.jpg/600x600bb.jpg", podurl:"https://podcasts.apple.com/us/podcast/fantasy-footballers-fantasy-football-podcast/id917453719?uo=4", podurl2:"https://open.spotify.com/search/Fantasy Footballers - Fantasy Football Podcast" },
                    ],
    randomPodcasts_display: [], // this is a random 8 from the above full list of random podcasts
  },

  mounted() { // this is for the random podcasts
    this.$nextTick(function () {
        // when document ready load the random podcasts
        this.randomPodcasts_display = []

        for (let i = this.randomPodcasts_all.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [this.randomPodcasts_all[i], this.randomPodcasts_all[j]] = [this.randomPodcasts_all[j], this.randomPodcasts_all[i]];
        }

        for (i = 0; i < 8; i++) {
          this.randomPodcasts_display.push(this.randomPodcasts_all[i])
        }

        console.log("sadlfjlasdlkfasj")
        console.log(this.randomPodcasts_display)
    });
  },

  methods: {
    reset() {
      this.podcastList = []
      this.copy_podcastList = []
      this.genreDict = {}
    },

    genreClick(genre, event) {
      already_selected_flag = false // if a button is already selected and is clicked again--return to default state
      if (this.genreDict[genre] == 1) {
        already_selected_flag = true
      }
      
      // first reset all to un-clicked value of zero
      console.log(genre)
      for (var key in this.genreDict) {
        this.genreDict[key] = 0
      }
      
      // set clicked genre to active (1) unless it was already clicked
      if (!already_selected_flag) {
        this.genreDict[genre] = 1
      }
      console.log(this.genreDict)

      this.renderKey++

      this.genreSort(genre, already_selected_flag)
    },

    genreSort(genre, already_selected_flag) {
      this.podcastList = []
      this.podcastList = [].concat(this.copy_podcastList) // return to full list first

      if (!already_selected_flag) { // if it was already selected that means we just go back to full list
        this.podcastList = this.podcastList.filter(function(podcast) { return podcast['genres'].includes(genre)})

      }
      
    },

    pressEnter(value) {
      this.reset()
      this.userInput = value
      this.awaitingInput = false

      this.search = this.itunesDefaultURL + value
      // URL can't have spaces, so add '+'
      this.search = this.search.split(' ').join('+')

      axios.get(this.search, { headers: {"Access-Control-Allow-Origin": true } }).then(response1 => { 
        crossOriginIsolated = true
        this.loading = false
        this.info = response1
        this.allResultCount = this.info.data.resultCount
        this.resultCount = this.allResultCount
        queryCollectionName = response1.data.results[0].collectionName
        newSearch = this.itunesGenreSearch + response1.data.results[0].genreIds[0]

        axios.get(newSearch, { headers: {"Access-Control-Allow-Origin": true } }).then(response2 => { 
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
              podcast["podurl2"] = this.spotifySearch + podcast["collectionName"]
              podcast['genres'] = response2.data.results[i].genres

              // if there is a PODCASTS tag on this podcast, let's remove it
              podcastTagIndex = podcast['genres'].indexOf("Podcasts")
              if (podcastTagIndex > -1) {
                podcast['genres'].splice(podcastTagIndex, 1)
              }

              // add genres to genreDict if it isn't already there
              for (k=0; k < podcast['genres'].length; k++) {
                curr_genre = podcast['genres'][k]

                if (!(curr_genre in this.genreDict)) {
                  // if genre is NOT already in our list, add it
                  this.genreDict[curr_genre] = 0
                }
              }

              if (podcast["collectionName"] != queryCollectionName) {
                this.podcastList.push(podcast)
              }

              // this is for random podcast collection if needed

            } // END FOR
            console.log(this.podcastList)
            this.copy_podcastList = [].concat(this.podcastList)

        })
      })

      
    },
  },
})
