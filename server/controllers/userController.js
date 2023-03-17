const USER = require('../database/model/Users')
const bcrypt = require('bcrypt')
const { v4: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')

exports.login = async (req,res) => {
    const {username, password} = req.body
    const user = await USER.findOne({username})
    if(!user) return res.status(404).json({msg: 'User tidak ditemukan'})
    if(!(await bcrypt.compare(password, user.password))) return res.status(403).json({msg: 'Password invalid'})

    req.session.userId = user.uuid
    req.session.authenticated = true

    const token = jwt.sign({username: user.username, email: user.email, fullname: user.email}, process.env.TOKEN_SECRET,{
        expiresIn: '20s'
    })
    const refreshToken = jwt.sign({username: user.username, email: user.email, fullname: user.email}, process.env.REFRESH_TOKEN_SECRET,{
        expiresIn: '1d'
    })
    
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        signed: true
    })
    res.status(200).json({token})
}

exports.refreshToken = async (req,res) => {
    const refreshToken = req.signedCookies.refreshToken

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.json({msg: err.message})
        const token = jwt.sign({username: user.username, email: user.email, fullname: user.email}, process.env.TOKEN_SECRET,{
            expiresIn: '20s'
        })
        return res.json({token})
    })
}

exports.getme = async (req,res) => {
    const userId = req.session.userId
    if(!userId) return res.status(404).json({msg: 'You need to login back'})
    if(!req.session.authenticated) return res.status(404).json({msg: 'you are not authenticated as our user'})


    const user = await USER.findOne({uuid: userId})
    if(!user) return res.json({msg: 'error'});
    return res.status(200).json({
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        role: user.role
    })
}

exports.logout = async (req,res) => {
    req.session.destroy(err => {
        if(err) return res.status(400).json({msg: 'gagal logout'})
        res.clearCookie('refreshToken')
        return res.status(200).json({msg: 'berhasil logout'})
    })
}

exports.signup = async (req,res) => {
    const { password, username, ...user } = req.body
    const User = await USER.findOne({username})
    
    if(User) return res.status(403).json({msg: 'that name is already exist', errorAt: 'username'})
    if(password.length < 8) return res.status(403).json({msg: 'minimum character of password is 8', errorAt: 'password'})
    if(password.length > 64) return res.status(403).json({msg: 'maximum character of password is 64', errorAt: 'password'})
    
    const hashPassword = await bcrypt.hash(password, 10)
    user.username = username
    user.password = hashPassword
    user.role = 'user'
    user.uuid = uuidv4()

    USER.insertMany([user])
        .then(result => {
            res.status(200).json({msg: 'Berhasil signup'})
        }).catch(err => {
            res.status(403).json({msg: 'Gagal signup'})
        })
}