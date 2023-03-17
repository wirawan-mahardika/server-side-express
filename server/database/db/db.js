const mongoose = require('mongoose')

const loginDb = mongoose.createConnection('mongodb://127.0.0.1:27017/login', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})

const resourcesDb = mongoose.createConnection('mongodb://127.0.0.1:27017/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
})

module.exports = {loginDb, resourcesDb}