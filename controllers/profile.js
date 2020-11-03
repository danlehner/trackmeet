const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

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

    let mostPopularArtist = '' 
    let mostPopularGenre = '' 
    let unheardSongs = []

    function getMostPopArt() {
      let mostPop = user.artists[0]
      for (let i = 0; i < user.artists.length; i++) {
        if (mostPop.songs.length < user.artists[i].songs.length) {
          mostPop = user.artists[i]
        }
      }
      mostPopularArtist = mostPop
    }

    function getMostPopGen() {
      let mostPop = user.genres[0]
      for (let i = 0; i < user.genres.length; i++ ) {
        if (mostPop.artists.length < user.genres[i].artists.length) {
          mostPop = user.genres[i]
        }
      }
      mostPopularGenre = mostPop
    }

    function getUnheardSongs() {
      user.songs.forEach(song => {
        if (!song.listenedTo) {
          unheardSongs.push(song)
        }
      })
    }

    getMostPopGen()
    getMostPopArt()
    getUnheardSongs()

    context = {
      // genres: foundGenres,
      // artists: foundArtists, 
      // songs: foundSongs, 
      user: user,
      mostPopularArtist: mostPopularArtist, 
      mostPopularGenre: mostPopularGenre, 
      unheardSongs: unheardSongs
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

    // const deletedSong = await db.Song.findByIdAndDelete(req.params.songID)
    // const artist = await db.Artist.findById(deletedSong.artist)
    // const genre = await db.Genre.findById(deletedSong.genre)

    const user = await db.User.findById(req.session.currentUser.id)
     .populate('songs')
     .populate('genres')
     .populate('artists')

    const songToDelete = await db.Song.findById({ _id: req.params.songID })

    // remove the song from the users songs
    // console.log("user's song", user.songs)
    user.songs.remove(songToDelete)

    // remove the song from the relevant artist
    const artist = await db.Artist.findById(songToDelete.artist)
    artist.songs.remove(songToDelete)

    // remove the song from the relevant genre
    const genre = await db.Genre.findById(songToDelete.genre)
    genre.songs.remove(songToDelete)

    // if an artist in the user's artists has no songs, delete the artist
    // if a genre in the user's genres has no songs, delete the genre

    artist.songs.remove(songToDelete)
    genre.songs.remove(songToDelete)

    if (!artist.songs.length) {
      await db.Artist.findByIdAndDelete(artist._id)
      user.artists.remove(artist)
    } else {
      artist.save()
    }

    if (!genre.songs.length) {
      await db.Genre.findByIdAndDelete(genre._id)
      user.genres.remove(genre)
    } else {
      genre.save()
    }

    user.save()

    res.redirect('/profile/')
    
  } catch (error) {
    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
})

/* GENRES */

router.get('/genres', async (req, res) => {
  try {

    // const foundGenres = await db.Genre.find({})
    const user = await db.User.findById(req.session.currentUser.id).populate('genres')
  
    context = {
      // allGenres: foundGenres
      user: user
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
    // const foundArtists = await db.Artist.find({})
    const user = await db.User.findById(req.session.currentUser.id).populate('artists')

    context = {
      // allArtists: foundArtists
      user: user
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

    const queriedArtist = await db.Artist.findOne({ _id: req.params.artistID})

    const dzArtistId = queriedArtist.dzArtistId
  
    const DZ_API_KEY = 'fae0f6f90emsh8e90cd79d598afcp1e6185jsn8b369fe30354'
  
    const GET_CONFIG = {
      "method": "GET",
        "headers": {
          "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
          "x-rapidapi-key": `${DZ_API_KEY}`
        }
    }
    
  
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/artist/${dzArtistId}/related`, GET_CONFIG)
        .then(res => res.json())
        .then(json => {
          relatedArtists = json.data
      })


    context = {
      artist: foundArtist, 
      genre: foundGenre,
      relatedArtists: relatedArtists
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
    
    // const foundSongs = await db.Song.find({})
    const user = await db.User.findById(req.session.currentUser.id).populate('songs')

    context = {
      user: user
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

    // const deletedSong = await db.Song.findByIdAndDelete(req.params.songID)
    // const artist = await db.Artist.findById(deletedSong.artist)
    // const genre = await db.Genre.findById(deletedSong.genre)

    const user = await db.User.findById(req.session.currentUser.id)
     .populate('songs')
     .populate('genres')
     .populate('artists')

    const songToDelete = await db.Song.findById({ _id: req.params.songID })

    // remove the song from the users songs
    // console.log("user's song", user.songs)
    user.songs.remove(songToDelete)

    // remove the song from the relevant artist
    const artist = await db.Artist.findById(songToDelete.artist)
    artist.songs.remove(songToDelete)

    // remove the song from the relevant genre
    const genre = await db.Genre.findById(songToDelete.genre)
    genre.songs.remove(songToDelete)

    // if an artist in the user's artists has no songs, delete the artist
    // if a genre in the user's genres has no songs, delete the genre

    artist.songs.remove(songToDelete)
    genre.songs.remove(songToDelete)

    if (!artist.songs.length) {
      await db.Artist.findByIdAndDelete(artist._id)
      user.artists.remove(artist)
    } else {
      artist.save()
    }

    if (!genre.songs.length) {
      await db.Genre.findByIdAndDelete(genre._id)
      user.genres.remove(genre)
    } else {
      genre.save()
    }

    user.save()

    res.redirect('/profile/')
    
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