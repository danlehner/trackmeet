const express = require('express')
const router = express.Router()

// HOME
router.get('/', (req, res) => {
  res.render('home/index.ejs')
})

// SEARCH
router.get('/search', (req, res) => {
  res.render('home/search.ejs')
})

module.exports = router