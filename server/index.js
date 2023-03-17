const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const session = require('express-session')
const MongoStore = require('connect-mongo')


dotenv.config()
const app = express()
const userRoute = require('./routes/Login')
const resourcesRoute = require('./routes/Resources')
const authJwt = require('./auth/authJwt')

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(session({
        resave: false,
        secret: process.env.SESS_SECRET,
        saveUninitialized: false,
        cookie: {
        httpOnly: true,
        maxAge: 1000 * 3600 * 24 
    }, 
    store: new MongoStore({
        mongoUrl: 'mongodb://127.0.0.1:27017/sessionShop',
        autoRemove: 'disabled'
    })
}))
app.use(cookieParser(process.env.COOKIE_SECRET))

app.use('/api/user', userRoute)
app.use('/api/resources', authJwt, resourcesRoute)

app.listen(1000, () => console.log('server is listening at port 1000'))