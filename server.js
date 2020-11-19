const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 80
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb+srv://ivan:ivan@cluster0.cox6i.mongodb.net/bwa_test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function () {
  console.log("we're connecting")
})

const UserSchema = mongoose.Schema({
  username: String,
  password: String
})
const User = mongoose.model('User', UserSchema)

const ToDoSchema = mongoose.Schema({
  owner: String,
  description: String,
  _tags: Array,
  completed: Boolean
})
const ToDo = mongoose.model('ToDo', ToDoSchema)

const app = express()
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

http.createServer(app).listen(port)

app.post('/user', (req, res) => {
  if (req.body.action === 'signup') {
    User.find({}, (err, users) => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      } else if (users.length > 20) {
        res.json({
          action: 'signup',
          message: 'Sorry max twenty users'
        })
      } else {
        const newUser = new User({
          username: req.body.username,
          password: req.body.password
        })
        newUser.save((err, result) => {
          if (err) {
            console.log(err)
            res.sendStatus(500)
          }
          res.status(200).json({
            action: 'signup',
            message: result.username + ' successfully registered'
          })
        })
      }
    })
  } else if (req.body.action === 'login') {
    User.find(
      { username: req.body.username, password: req.body.password },
      (err, user) => {
        if (err) {
          console.log(err)
          res.sendStatus(500)
        } else if (user.length !== 0) {
          ToDo.find({ owner: user[0].username }, (err, tasks) => {
            if (err) {
              console.log(err)
              res.sendStatus(500)
            }
            res.json({
              action: 'login',
              username: user[0].username,
              tasks: tasks
            })
          })
        } else {
          res.sendStatus(201)
        }
      }
    )
  }
})

app.post('/todos/:action', (req, res) => {
  switch (req.params.action) {
    case 'add':
      ToDo.find({}, (err, tasks) => {
        if (tasks.length < 100) {
          const newTask = new ToDo(req.body)
          newTask.save((err, result) => {
            if (err) {
              console.log(err)
              res.sendStatus(500)
            }
            res.sendStatus(200)
          })
        } else {
          res.sendStatus(501)
        }
      })

      break

    case 'done':
      ToDo.updateOne(
        { _id: req.body.id },
        { completed: req.body.completed },
        (err, task) => {
          if (err) {
            console.log(err)
            res.sendStatus(500)
          }
          if (task.ok === 1) res.sendStatus(200)
        }
      )
      break

    case 'edit':
      ToDo.updateOne(
        { _id: req.body.id },
        { description: req.body.description },
        (err, task) => {
          if (err) {
            console.log(err)
            res.sendStatus(500)
          }
          if (task.ok === 1) res.sendStatus(200)
        }
      )
      break

    case 'delete':
      ToDo.deleteOne({ _id: req.body.id }, (err, task) => {
        if (err) {
          console.log(err)
          res.sendStatus(500)
        }
        if (task.ok === 1) res.sendStatus(200)
      })
  }
})
