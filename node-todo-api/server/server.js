require('./config/config')

var _ = require('lodash')
var express = require('express')
var bodyParser = require('body-parser')
var {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')

var app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send({
    app: 'App under construction'
  })
})

app.post('/api/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  })

  todo.save().then((doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/api/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos})
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/api/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({todo})
  }, (err) => {
    return res.status(404).send()
  }).catch((e) => {
    res.status(400).send()
  })
})

app.delete('/api/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({todo})
  }, (err) => {
    return res.status(404).send()
  }).catch((e) => {
    res.status(400).send()
  })
})

app.patch('/api/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(404).send()
    }

    res.send({todo})
  }).catch((err) => {
    res.status(400).send()
  })

})

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])

  var user = new User(body)

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((err) => {
    res.status(400).send(err)
  })
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

// POST /users/login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user)
    })
  }).catch((e) => {
    res.status(400).send()
  })
})

app.delete('/users/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(404).send()
  })
})

app.listen(port, () => {
  console.log(`started on port ${port}`);
})

module.exports = {app}
