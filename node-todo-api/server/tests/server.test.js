const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('../server')
const {Todo} = require('../models/todo')

const dummyTodos = [{
  _id: new ObjectID(),
  text: 'first test todo'
}, {
  _id: new ObjectID(),
  text: 'second test todo'
}]

beforeEach((done) => {
  Todo.deleteMany({}).then(() => {
    return Todo.insertMany(dummyTodos)
  }).then(() => done())
})

describe('Post /api/todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text'

    request(app)
      .post('/api/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e) => {
          done(e)
        })
      })
  })

  it('should not create a new todo with invalid data', (done) => {
    var text = ''

    request(app)
      .post('/api/todos')
      .send({text})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(dummyTodos.length)
          done()
        }).catch(e => done(e))
      })
  })
})

describe('GET /api/todos', () => {
  it('should get all todos', (done) => {

    request(app)
      .get('/api/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(dummyTodos.length)
      })
      .end(done)
  })
})

describe('GET /api/todos/:id', () => {
  it('should get todo document', (done) => {
    request(app)
      .get(`/api/todos/${dummyTodos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(dummyTodos[0].text)
      })
      .end(done)
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/api/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/api/todos/123`)
      .expect(404)
      .end(done)
  })
})
