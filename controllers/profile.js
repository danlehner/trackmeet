const express = require('express')
const router = express.Router()

const db = require('../models')


/* PROFILE */
router.get('/', async (req, res) => {
  try {

    // const foundGenres = await db.Genre.find({})
    // const foundArtists = await db.Artist.find({})
    // const foundSongs = await db.Song.find({})

    const user = await db.User.findById(req.session.currentUser.id)
      .populate('artists')
      .populate('genres')
      .populate('songs')

    context = {
      // genres: foundGenres,
      // artists: foundArtists, 
      // songs: foundSongs, 
      user: user
    }

    res.render('profile/index.ejs', context)
    
  } catch (error) {

    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

router.get('/edit', async (req, res) => {

  try {
    const foundUser = await db.User.findById(req.session.currentUser.id)
    
    const context = { 
      user: foundUser
    }

    res.render('profile/edit.ejs', context)

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

router.put('/edit', async (req, res) => {
  try {

   const user = await db.User.findById(req.session.currentUser.id)
   
   const updateData = {
    $set: {
      username: req.body.username, 
      profilePic: req.body.profilePic, 
      city: req.body.city, 
      bio: req.body.bio 
    }
   }

   await db.User.findByIdAndUpdate(req.session.currentUser.id, updateData, { new: true })
   res.redirect('/profile')
    
  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})


router.delete('/:songID', async (req, res) => {

  try {

    const deletedSong = await db.Song.findByIdAndDelete(req.params.songID)
    const artist = await db.Artist.findById(deletedSong.artist)
    const genre = await db.Genre.findById(deletedSong.genre)
    const user = await db.User.findById(req.session.currentUser.id)

    console.log(user)

    // artist.songs.remove(deletedSong)
    // genre.songs.remove(deletedSong)

    // if (!artist.songs.length) {
    //   await db.Artist.findByIdAndDelete(artist._id)
    // } else {
    //   artist.save()
    // }

    // if (!genre.songs.length) {
    //   await db.Genre.findByIdAndDelete(genre._id)
    // } else {
    //   genre.save()
    // }

    // res.redirect('/profile/')
    
  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
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
    const foundGenre = await db.Genre.findById(foundArtist.genre)

    context = {
      artist: foundArtist, 
      genre: foundGenre
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
    const foundArtist = await db.Artist.findById(foundSong.artist)
    const foundGenre = await db.Genre.findById(foundArtist.genre)

     context = {
       song: foundSong, 
       artist: foundArtist, 
       genre: foundGenre
     }

    res.render('profile/songs/song-show.ejs', context)

  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

router.delete('/songs/:songID', async (req, res) => {
  try {

    const deletedSong = await db.Song.findByIdAndDelete(req.params.songID)
    const artist = await db.Artist.findById(deletedSong.artist)
    const genre = await db.Genre.findById(deletedSong.genre)

    artist.songs.remove(deletedSong)
    genre.songs.remove(deletedSong)

    if (!artist.songs.length) {
      await db.Artist.findByIdAndDelete(artist._id)
    } else {
      artist.save()
    }

    if (!genre.artists.length) {
      await db.Genre.findByIdAndDelete(genre._id)
    } else {
      genre.save()
    }

    res.redirect('/profile/songs')
    
  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})


router.put('/songs/:songID/edit', async (req, res) => {
  // determine what the req object is (either testimony or listenedTo)
  let updatedData

  if (req.body.testimony) {
    updatedData = {
      $set: {
        testimony: req.body.testimony
      }
    }
  } else {
    if (req.body.listenedTo == 'on') {
      updatedData = {
        $set: {
          listenedTo: true
        }
      }
    } else {
      updatedData = {
        $set: {
          listenedTo: false
        }
      }
    }
  }

  const updatedSong = await db.Song.findByIdAndUpdate(req.params.songID, updatedData, { new: true})
  res.redirect(`/profile/songs/${updatedSong._id}`)
})

module.exports = router