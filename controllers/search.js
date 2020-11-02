const express = require('express')
const router = express.Router()

const db = require('../models')

// SEARCH
router.get('/', (req, res) => {
  res.render('home/search.ejs')
})

// TEST SEARCH POST ROUTE
router.post('/', async (req, res) => {

  try {
    const foundArtist = await db.Artist.findOne({ dzArtistId: req.body.dzArtistId})
    const foundGenre = await db.Genre.findOne({ dzGenreId: req.body.dzGenreId })
    // const user = await db.User.findById(req.session.currentUser.id)
  
    if (foundGenre && foundArtist) {

      req.body.genre = foundGenre._id
      req.body.artist = foundArtist._id

      const createdSong = await db.Song.create(req.body)

      foundGenre.songs.push(createdSong)
      foundArtist.songs.push(createdSong)

      await foundArtist.save() 
      await foundGenre.save() 

    } else if (foundGenre) {

      req.body.genre = foundGenre._id

      const createdArtist = await db.Artist.create({
        dzArtistId: req.body.dzArtistId,
        name: req.body.artist,
        genre: req.body.genre, 
        artistPicture: req.body.artistPicture
      })

      req.body.artist = createdArtist._id

      const createdSong = await db.Song.create(req.body)

      foundGenre.artists.push(createdArtist)
      foundGenre.songs.push(createdSong)
      createdArtist.songs.push(createdSong)

      await createdArtist.save() 
      await foundGenre.save() 

     } else if (foundArtist) {

      req.body.artist = foundArtist._id

      const createdGenre = await db.Genre.create({
        dzGenreId: req.body.dzGenreId,
        name: req.body.genre, 
        genrePicture: req.body.genrePicture
      })

      req.body.genre = createdGenre._id

      const createdSong = await db.Song.create(req.body)

      createdGenre.artists.push(foundArtist)
      createdGenre.songs.push(createdSong)
      foundArtist.songs.push(createdSong)

      await createdGenre.save()
      await foundArtist.save() 

     }  else {

      const createdGenre = await db.Genre.create({
        dzGenreId: req.body.dzGenreId,
        name: req.body.genre, 
        genrePicture: req.body.genrePicture
      })
    
      req.body.genre = createdGenre
    
      const createdArtist = await db.Artist.create({
        dzArtistId: req.body.dzArtistId,
        name: req.body.artist,
        genre: req.body.genre, 
        artistPicture: req.body.artistPicture
      })
    
      req.body.artist = createdArtist

      const createdSong = await db.Song.create(req.body)
    
      createdGenre.songs.push(createdSong)
      createdGenre.artists.push(createdArtist)
      createdArtist.songs.push(createdSong)
    
      await createdArtist.save()
      await createdGenre.save()
    } 

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

module.exports = router
