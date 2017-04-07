const md5 = require('md5')

const cookieParser = require('cookie-parser')
const request = require('request')
const qs = require('querystring')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const callbackURL = 'http://localhost:3000/auth/callback'
const clientSecret = '615a1dad8ce6220407ab899f61aab8fc'
const clientID = '423664881330566'
const config = {clientSecret, clientID, callbackURL}

let users = []
// serialize the user for the session
passport.serializeUser(function(user, done) {
    users[user.id] = user
    done(null, user.id)
})

// deserialize the user from the session
passport.deserializeUser(function(id, done) {
    var user = users[id]
    done(null, user)
})

passport.use(new FacebookStrategy(config, 
    function(token, refreshToken, profile, done) {
        process.nextTick(function() {
            return done(null, profile)
        })
    }))



const password = '123'
const salt = md5('04/03/2017')

const Users = {
    'yy55':{
        username: 'yy55',
        hash: md5(password + salt),
        salt: salt
    }
}

const hello = (req, res) => {
    res.send({ hello: 'world!!' })
}


const addUser = (username, password) => {
    const newSalt = md5((new Date()).getTime())
    Users[username] = {username, hash: md5(password + newSalt), salt: newSalt}
}

const stubLogin = (req, res) =>{
    if(!req.body.username || !req.body.password){
        res.status(401).send('Unauthorized')
        return
    }
    res.send({username: req.body.username, status:'success'})
}

const postRegister = (req, res) =>{
    console.log("try to register")
    if(!req.body.username){
        res.status(400).send('please supply your username')
        return
    }
    if(!req.body.password){
        res.status(400).send('please supply your password')
        return
    }
    if(Users[req.body.username]){
        res.status(400).send('user already exists')
    }

    addUser(req.body.username, req.body.password)

    res.send({
        username: Users[req.body.username].username,
        status: 'success'
    })
}

const postLogin = (req, res) =>{
    console.log("try to log in")
    if(!req.body.username || !req.body.password){
        res.status(401).send('Unauthorized')
        return
    }
    const userObj = Users[req.body.username]
    console.log(userObj)
    console.log(md5(req.body.password + userObj.salt))

    if(userObj && md5(req.body.password + userObj.salt) == userObj.hash){
        res.send({username:userObj.username, status:'success'})
    }
    else{
        res.status(401).send('Unauthorized')
        return
    }
}

const logout = (req, res) =>{
    req.logout()
    res.redirect('/')
    res.status('success')
}
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

const profile = (req, res) => {
    res.send('ok now what?', req.user)
}

module.exports = app =>{
    app.use(cookieParser())
    app.use(session({ secret: 'thisisalonglongsecret'}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.post('/login', postLogin)
    app.post('/register', postRegister)
    app.put('/logout', logout)
    app.get('/', hello)
    app.use('/login/facebook', passport.authenticate('facebook', {scope: 'email'}))
    app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
    app.use('/profile', isLoggedIn, profile)
    app.use('/fail', fail)
}