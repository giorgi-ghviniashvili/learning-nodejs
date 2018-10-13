const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('TodoApp')

  db.collection('Users')
    .findOneAndUpdate({
      _id: new ObjectID('5bbe7022aceb1941eccd559a')
    }, {
      $set: {
        name: 'Jora'
      },
      $inc: {
        age: 1
      }
    })

  //client.close()
})
