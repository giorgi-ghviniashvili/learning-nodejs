const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserScheme = new mongoose.Schema({
  email: {
    type: String,
    minlength: 1,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
})

UserScheme.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['email', '_id']);
}

UserScheme.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign(JSON.stringify({ _id: user._id.toHexString(), access }), '123abc').toString();

  user.tokens = user.tokens.concat([{access, token}])

  return user.save().then(() => {
    return token;
  })
}

var User = mongoose.model('User', UserScheme)

module.exports.User = User
