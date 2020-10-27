const express = require('express')
const router = express.Router()

const db = require('../models')


/* PROFILE */
router.get('/', (req, res) => {
  res.render('profile/index.ejs')
})

router.get('/edit', (req, res) => {
  res.render('profile/edit.ejs')
})

/* GENRES */

router.get('/genres', async (req, res) => {

  const foundGenres = await db.Genre.find({})

  context = {
    allGenres: foundGenres
  }

  res.render('profile/genres/index.ejs', context)
})

router.get('/genres/:genreID', (req, res) => {
  res.render('profile/genres/genre-show.ejs')
})

/* ARTISTS */

router.get('/artists', async (req, res) => {

  const foundArtists = await db.Artist.find({})

  context = {
    allArtists: foundArtists
  }
  res.render('profile/artists/index.ejs', context)
});

router.get('/artists/:artistID', (req, res) => {
  res.render('profile/artists/artist-show.ejs')
})

/* SONGS */

router.get('/songs', (req, res) => {
  res.render('profile/songs/index.ejs')
})

router.get('/songs/:songID', (req, res) => {
  res.render('profile/songs/song-show.ejs')
})

router.get('/songs/:songID/edit', (req, res) => {
  res.render('profile/songs/song-edit.ejs')
})

module.exports = router