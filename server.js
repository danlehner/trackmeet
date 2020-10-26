// External packages
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');

// Internal references
const controllers = require('./controllers')

const PORT = 3000

// middleware 
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method")); 
app.use(express.static(path.join(__dirname, 'public'))); 


/* CONTROLLER ROUTING */

app.use('/', controllers.home)
app.use('/profile', controllers.profile)
app.use('/discovery', controllers.discovery)

// port listening
app.listen(PORT, () => {
  console.log(`Now serving on http://localhost:${PORT}`)
})