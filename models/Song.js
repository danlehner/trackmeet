const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  dzArtistId: { type: Number }, 
  title: { type: String, required: true }, 
  artist: { type: mongoose.Schema.Types.ObjectID, ref: 'Artist' }, 
  artistPicture: { type: String }, 
  albumArt: { type: String, required: true }, 
  genre: { type: mongoose.Schema.Types.ObjectID, ref: 'Genre' },
  genrePicture: { type: String }, 
  listenedTo: { type: Boolean }, 
  testimony: { type: String},
}); 

const Song = mongoose.model('Song', songSchema)

module.exports = Song