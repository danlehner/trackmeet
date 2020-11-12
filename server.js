// External packages
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session'); 
const MongoStore = require('connect-mongo')(session)
require('dotenv').config()

// Internal references
const controllers = require('./controllers'); 

const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs'); 

// middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method")); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: process.env.SESSION_SECRET || "spacewafflefighter", 
  store: new MongoStore({ 
    url: process.env.MONGODB_URL || "mongodb://localhost:27017/trackstar"
  }), 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}))

const authRequired = function(req, res, next) {
  if(!req.session.currentUser) {
    return res.redirect("/login")
  }
  next(); 
}

/* CONTROLLER ROUTING */

app.get('/', (req, res) => {
   
  const context = {
    user: req.session.currentUser
  }

  res.render('home/index.ejs', context)
})

app.use('/', controllers.auth)
app.use('/search', authRequired, controllers.search)
app.use('/profile', authRequired, controllers.profile)


// port listening
app.listen(PORT, () => {
  console.log(`Now serving on http://localhost:${PORT}`)
})