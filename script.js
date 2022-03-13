var resultView = new Vue({
  el: '#app',
  data: {
    awaitingInput: true,
    userInput: "",
  },
  methods: {
    pressEnter(value) {
      this.userInput = value
      this.awaitingInput = false

      console.log(value)
    },
  },
})
