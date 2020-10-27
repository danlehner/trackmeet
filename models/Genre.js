const mongoose = require('mongoose')

const genreSchema = new mongoose.Schema({
  dzGenreId: { type: String, required: true }, 
  name: { type: String, required: true }, 
  artists: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Artist'
    }
  ], 
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Song'
    }
  ], 
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre