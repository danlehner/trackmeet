const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  dzArtistId: { type: Number }, 
  name: { type: String, required: true }, 
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Song'
    }
  ], 
  genre: { type: mongoose.Schema.Types.ObjectID, ref: 'Genre', required: true },
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist