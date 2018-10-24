// sha 256
// const {SHA256} = require('crypto-js')

// var message = 'Hey, I am an new user.'
// var hash = SHA256(message).toString()

// console.log(hash);
const jwt = require('jsonwebtoken')

var data = {
  id: 10
}

var token = jwt.sign(data, '123abc')
console.log(token)

var varify = jwt.verify(token, '123abc')
console.log(varify);
