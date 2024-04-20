const mongoose = require('mongoose')

//createSchema
//use match to see if the email provided matches the valid expression
const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      unique: true, //unique create unique index
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
  })
  
  module.exports = mongoose.model('User', UserSchema)