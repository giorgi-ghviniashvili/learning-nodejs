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

describe('DELETE /api/todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = dummyTodos[1]._id.toHexString()

    request(app)
      .delete(`/api/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBe(null)
          done()
        }).catch(e => {
          return done(e)
        })
      })
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/api/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('shoudl return 404 if object id is invalid', (done) => {
    request(app)
      .delete(`/api/todos/123`)
      .expect(404)
      .end(done)
  })
})

describe('/PATCH /api/todo/:id', () => {
  it('should update todo', (done) => {
    var hexId = dummyTodos[0]._id.toHexString()
    var text = 'this should be a new text'

    request(app)
      .patch(`/api/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
      })
      .end(done)
  })
})
