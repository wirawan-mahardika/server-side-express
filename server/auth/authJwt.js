const jwt = require('jsonwebtoken')
require('dotenv').config()

function authJwt(req,res,next){
    let token = req.headers['authorization']
    token = token && token.split(' ')[1]

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({msg: err.message})
        req.user = user
        next()
    })
}

module.exports = authJwt