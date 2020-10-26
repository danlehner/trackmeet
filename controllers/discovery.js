const express = require('express')
const router = express.Router()

const db = require('../models')

router.get('/', (req, res) => {
  res.render('discovery/index.ejs')
})

router.get('/:artistID', (req, res) => {
  res.render('discovery/discovery-artist.ejs')
})

module.exports = router