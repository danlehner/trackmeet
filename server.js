// External packages
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');

// Internal references



// middleware 
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method")); 
app.use(express.static(path.join(__dirname, 'public'))); 

// test routings
app.get('/', (req, res) => {
  res.send('Hello!')
})

const PORT = 3000

// port listening
app.listen(PORT, () => {
  console.log(`Now serving on http://localhost:${PORT}`)
})