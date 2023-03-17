const { loginDb } = require('../db/db')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    username: String,
    password: String,
    uuid: String,
    role: String
})

userSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject()
    object.id = _id
    return object
})

const USER = loginDb.model('users', userSchema)
module.exports = USER