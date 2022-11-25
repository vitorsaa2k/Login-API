const express = require('express')
const profileRouter = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt');


profileRouter.post('/signup', async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  let {email, password, name} = req.body
  name = name.trim()
  email = email.trim()
  password = password.trim()
  if(name == '' || email == '' || password == '') {
    res.json({
      status: 'FAILED',
      message: 'One or more empty inputs'
    })
  } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    res.json({
      status: 'FAILED',
      message: 'Invalid email'
    })
  } else if (password.length < 8) {
    res.json({
      status: 'FAILED',
      message: 'Password must have more than 8 characters'
    })
  } else {
    await User.find({email}).then(response => {
      if(res.length) {
        res.json({
          status: 'FAILED',
          message: 'User already exists'
        })
      } else {
        const saltRounds = 10
        bcrypt.hash(password, saltRounds).then(async hash => {
           const newUser = new User({
            email,
            name,
            password: hash,
          })
          await newUser.save().then(user => {
            res.json({
              status: 'SUCCESS',
              message: 'User created succesfully',
              user: user
            })
          }).catch(response => {
            res.json({
              status: 'FAILED',
              message: 'Error while saving the user'
            })
          })
        })
      }
    }).catch(err => {
      res.json({
        err : err,
        status: 'FAILED',
        message: 'An error ocurred while checking if user exists'
      })
    })
  }
})

profileRouter.get('/profile/:name', async (req, res) => {
  const user = await User.findOne({name: req.params.name})
  res.json(user)
})

profileRouter.put('/profile/:name', async (req, res) => {
  const user = await User.findOne({name: req.params.name})
  await user.updateOne(req.body)
  await user.save()
  res.json({
    status: 'SUCCESS',
    message: 'The description was changed',
    user: await User.findOne({name: req.params.name})
  })
})

profileRouter.post('/signin', async (req, res) => {

  let {email, password} = req.body
  const user = await User.findOne({email})

  if(email == '' || password == '') {
    res.json({
      status: 'FAILED',
      message: 'Empty inputs'
    })
  } else {
    if(user) {
      bcrypt.compare(password, user.password).then(response => {
        if(response) {
          res.json({
            status: 'SUCCESS',
            message: 'the password and email matches',
            user: user,
          })
        } else {
          res.json({
            status: 'FAILED',
            message: 'Wrong password',
          })
        }
      }).catch(err => {
        res.json({
          status: 'FAILED',
          message: 'Error checking the password',
        })
      })
    } else {
      res.json({
        status: 'FAILED',
        message: 'User doesnt exists',
        user: {
          email: email,
          password: password
        }
      })
    }

  }

})

module.exports = profileRouter