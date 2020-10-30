const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  dzArtistId: { type: Number }, 
  name: { type: String }, 
  artistPicture: { type: String }, 
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Song'
    }
  ], 
  genre: { type: mongoose.Schema.Types.ObjectID, ref: 'Genre' },
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist