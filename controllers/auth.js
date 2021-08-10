const express = require('express')
const router = express.Router() 
const db = require('../models')
const bcrypt = require('bcryptjs')

router.get('/register', (req, res) => {
  res.render('auth/register')
})

router.post('/register', async (req, res) => {
  try {

    const foundUser = await db.User.findOne({ email: req.body.email })
    
    if (foundUser) {
      res.send({ message: "Account already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(req.body.password, salt)
    req.body.password = hash
    
    await db.User.create(req.body)

    res.redirect('/login')

  } catch (error) {
    console.log(error)
    res.send({ message: "Internal Service Error"})
  }
})

router.get('/login', (req, res) => {
  res.render('auth/login')
})

router.post('/login', async (req, res) => { 
  try {
    const foundUser = await db.User.findOne({ email: req.body.email })

    if (!foundUser) {
      return res.send({ message: "Email or password is incorrect"})
    }

    const match = await bcrypt.compare(req.body.password, foundUser.password)

    if (!match) { 
      return res.send({ message: "Email or password is incorrect"})
    }

    req.session.currentUser = {
      username: foundUser.username, 
      id: foundUser._id
    }

    res.render('/profile')
    
  } catch (error) {
    console.log(error)
    res.send({ message: "Internal Service Error"})
  }
})

router.post('/guest', async (req, res) => {

  let string = ''

  const randomEmail = function() {

    const alphanumeric = [1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j', 'k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

    for (let i = 0; i <= 10; i++) {
      let index = Math.floor(Math.random() * alphanumeric.length)
      string += alphanumeric[index]
    }

    return `${string}@email.com`
  }

  const emailToUse = randomEmail()

  const guestReq = {
    username: string, 
    email: emailToUse, 
    password: process.env.PASSWORD, 
    profilePic: "https://as2.ftcdn.net/v2/jpg/02/15/84/43/500_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg", 
    city: "Anywhere, USA", 
    bio: "I love music!", 
  }

  await db.User.create(guestReq)

  const createdUser = await db.User.findOne({ email: emailToUse })

  req.session.currentUser = {
    username: createdUser.username, 
    id: createdUser._id
  }

  res.redirect('/')
})

router.delete('/logout', async (req, res) => {
  await req.session.destroy() 
  res.redirect('/')
})

module.exports = router