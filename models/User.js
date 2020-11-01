const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, 
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  profilePic: { type: String }, 
  city: { type: String }, 
  bio: { type: String }, 
  genres: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Genre'
    }
  ], 
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
  ]
})

const User = mongoose.model("User", userSchema)

module.exports = User