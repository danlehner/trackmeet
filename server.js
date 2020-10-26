const express = require('express')
const app = express()


// test routings
app.get('/', (req, res) => {
  res.send('Hello!')
})

const PORT = 3000

// port listening
app.listen(PORT, () => {
  console.log(`Now serving on http://localhost:${PORT}`)
})