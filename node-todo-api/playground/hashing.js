// sha 256
// const {SHA256} = require('crypto-js')
// const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var password = 'abc123!'

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
    
//   })
// })

var hashedPassword = '$2a$10$oqNsEZymYpHUz7ZUWbasmeZ/WkIrcTQb8dKzF9sUNnBtrrKRaQx7y';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});


// var message = 'Hey, I am an new user.'
// var hash = SHA256(message).toString()

// console.log(hash);

// var data = {
//   id: 10
// }

// var token = jwt.sign(data, '123abc')
// console.log(token)

// var varify = jwt.verify(token, '123abc')
// console.log(varify);
