// External packages
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session'); 
const MongoStore = require('connect-mongo')(session)

// Internal references
const controllers = require('./controllers'); 

const PORT = 3000

app.set('view engine', 'ejs'); 

// middleware 
app.use(express.json())
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride("_method")); 
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(session({
  resave: false, 
  saveUninitialized: false, 
  secret: "spacewafflefighter", 
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

  res.render('home/index', context)
})

// set up app.get for '/' once some of the other issues have been taken care of
app.use('/auth', controllers.auth)
app.use('/profile', controllers.profile)
app.use('/discovery', controllers.discovery)
app.use('/', controllers.home)


// port listening
app.listen(PORT, () => {
  console.log(`Now serving on http://localhost:${PORT}`)
})