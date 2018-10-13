const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('TodoApp')

  // db.collection('Todos')
  //   .insertOne({
  //     text: 'Something to do',
  //     completed: false,
  //     isNew: true
  //   }, (err, result) => {
  //     if (err) {
  //       return console.log('Unable to insert todo', err)
  //     }
  //
  //     console.log(JSON.stringify(result.ops, null, 2));
  //   })

  db.collection('Users')
    .insertOne({
      name: 'Giorgi Ghviniashvili',
      age: 23,
      location: 'Tbilisi'
    }, (err, result) => {
      if (err) {
        return console.log('Unable to insert an user', err)
      }

      console.log(JSON.stringify(result.ops, null, 2));
    })

  client.close()
})
