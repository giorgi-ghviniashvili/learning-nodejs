const expect = require('expect')
const request = require('supertest')

const {app} = require('../server')
const {Todo} = require('../models/todo')

const dummyTodos = [{
  text: 'first test todo'
}, {
  text: 'second test todo'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(dummyTodos)
  }).then(() => done())
})

describe('Post /todos', () => {
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

describe('GET /todos', () => {
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
