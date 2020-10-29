const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const db = require('../models')

router.get('/', async (req, res) => {
  try {

    const foundArtists = await db.Artist.find({})

    context = {
      artists: foundArtists
    }

    res.render('discovery/index.ejs', context)

  } catch (error) {
    
  }
})

router.get('/:artistID', async (req, res) => {
  try {

    const foundArtist = await db.Artist.findOne({ _id: req.params.artistID})

    const dzArtistId = foundArtist.dzArtistId

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
        json.data.map(artist => {
          const name = artist.name

          console.log(name)

          // this returns all the related artists names

          // question is: then what do you do with the retrieved artists? 
        
          // return fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:"${name}"`, GET_CONFIG)
          // .then(res => res.json())
          // .then(song => {
          //   console.log(song.data.title)
          //  })
        })
      })

      // the idea is to have a show page for an individual artists related artist
      // once that artist is clicked, then what? 
      // could do a dropdown menu of different songs as hidden forms to submit again 
      // needs: 
      // -- dzArtistId, title, artist, albumArt, genre


  } catch (error) {

    console.log(error)
    res.send( { message: 'Internal Server Error'} )
  }
  res.render('discovery/discovery-artist.ejs')
})

module.exports = router