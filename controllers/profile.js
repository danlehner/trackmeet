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
  try {

    const foundGenres = await db.Genre.find({})
  
    context = {
      allGenres: foundGenres
    }
  
    res.render('profile/genres/index.ejs', context)

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }

})

router.get('/genres/:genreID', async (req, res) => {

  try {

    const foundGenre = await db.Genre.findById(req.params.genreID)
      .populate('artists')
      .populate('songs')

    const context = {
      genre: foundGenre, 
    }

    res.render('profile/genres/genre-show.ejs', context)

  } catch (error) {

    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

/* ARTISTS */

router.get('/artists', async (req, res) => {

  try {
    const foundArtists = await db.Artist.find({})
  
    context = {
      allArtists: foundArtists
    }
  
    res.render('profile/artists/index.ejs', context)

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }

});

router.get('/artists/:artistID', async (req, res) => {

  try {
    
    const foundArtist = await db.Artist.findById(req.params.artistID).populate('songs')

    context = {
      artist: foundArtist
    }

    res.render('profile/artists/artist-show.ejs', context)

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

/* SONGS */

router.get('/songs', async (req, res) => {
  try {
    
    const foundSongs = await db.Song.find({})

    context = {
      allSongs: foundSongs
    }

    res.render('profile/songs/index.ejs', context)

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

router.get('/songs/:songID', async (req, res) => {

  try {
    const foundSong = await db.Song.findById(req.params.songID)

     context = {
       song: foundSong
     }

    res.render('profile/songs/song-show.ejs', context)

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

router.get('/songs/:songID/edit', async (req, res) => {

  try {

    const foundSong = await db.Artist.findById(req.params.songID)

    context = {
      songs: foundSong
    }
   
    res.render('profile/songs/song-edit.ejs')
    
  } catch (error) {

    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }

})

module.exports = router