const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  title: { type: String, required: true }, 
  artist: { type: mongoose.Schema.Types.ObjectID, ref: 'Artist', required: true }, 
  albumArt: { type: String, required: true }, 
  genre: { type: mongoose.Schema.Types.ObjectID, ref: 'Genre', required: true },
  listenedTo: { type: Boolean }, 
  testimony: { type: String},
}); 

const Song = mongoose.model('Song', songSchema)

module.exports = Song