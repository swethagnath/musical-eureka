const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true })
  .then(() => {
    console.log("connected to db")
  })

  .catch((err) => {
    console.log("not connected")
  })

module.exports = mongoose