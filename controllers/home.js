const express = require('express')
const router = express.Router()

// HOME
router.get('/', (req, res) => {
  res.send('This is the home page')
})

// SEARCH
router.get('/search', (req, res) => {
  res.send('This is the search page')
})

module.exports = router