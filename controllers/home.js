const express = require('express')
const router = express.Router()

const db = require('../models')

// HOME
router.get('/', (req, res) => {
  res.render('home/index.ejs')
})

// SEARCH
router.get('/search', (req, res) => {
  res.render('home/search.ejs')
})

// TEST SEARCH POST ROUTE
router.post('/search', async (req, res) => {

  try {

    const foundArtist = await db.Artist.findOne({ dzArtistId: req.body.dzArtistId})
    const foundGenre = await db.Genre.findOne({ dzGenreId: req.body.dzGenreId })
  
    // if (foundArtist) {
  
    // }
  
    // if (foundGenre) {
  
    // }
  
    const createdGenre = await db.Genre.create({
      dzGenreId: req.body.dzGenreId,
      name: req.body.genre
    })
  
    req.body.genre = createdGenre
  
    const createdArtist = await db.Artist.create({
      dzArtistId: req.body.dzArtistId,
      name: req.body.artist,
      genre: req.body.genre
    })
  
    req.body.artist = createdArtist
    
    const createdSong = await db.Song.create(req.body)
  
    createdGenre.songs.push(createdSong)
    createdGenre.artists.push(createdArtist)
    createdArtist.songs.push(createdSong)
  
    await createdArtist.save()
    await createdGenre.save()

  } catch (error) {

    console.log(error)
  }
})

module.exports = router