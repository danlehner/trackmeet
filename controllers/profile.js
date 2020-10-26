const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('This is the profile page')
})

router.get('/edit', (req, res) => {
  res.send('This is the Profile Edit page')
})

router.get('/genres', (req, res) => {
  res.send('This is the Genres page')
})

router.get('/genres/:genreID', (req, res) => {
  res.send("This is the display page for a given genre")
})

router.get('/artists', (req, res) => {
  res.send('This is the Artists page')
})

router.get('/artists/:artistID', (req, res) => {
  res.send("This is the display page for a given artist")
})

router.get('/songs', (req, res) => {
  res.send('This is the Songs page')
})

router.get('/songs/:songID', (req, res) => {
  res.send("This is the display page for a given song")
})

router.get('/songs/:songID/edit', (req, res) => {
  res.send("This is the edit page for a given song")
})

module.exports = router