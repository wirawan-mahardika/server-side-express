const { resourcesDb} = require('../db/db')
const mongoose = require('mongoose')

const resourcesSchema = mongoose.Schema({
    src: String,
    price: Number,
    stock: Number,
    name: String,
    brand: String,
    category: String
})

resourcesSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
})

const Resources = resourcesDb.model('resources', resourcesSchema)
module.exports = Resources