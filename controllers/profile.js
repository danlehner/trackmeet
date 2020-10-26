const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('this is the profile page')
})

module.exports = router