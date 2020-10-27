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
  const foundArtist = await db.Artist.findOne({ dzArtistId: req.body.dzArtistId})
  const foundGenre = await db.Genre.findOne({ name: req.body.genre })

  if (foundArtist) {

  }

  if (foundGenre) {

  }

  const createdSong = await db.Song.create({
    dzArtistId: req.body.dzArtistId,
    title: req.body.title, 
  })

  const createdArtist = await db.Artist.create({
    dzArtistId: req.body.dzArtistId,
    name: req.body.name
  })

  const createdGenre = await db.Genre.create({
    name: req.body.genre
  })

})

module.exports = router