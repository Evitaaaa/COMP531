const md5 = require('md5')
const User = require('./model.js').User
const Profile = require('./model.js').Profile
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
let redis = require('redis').createClient("redis://h:pa7e5a157252df5b6983ea82110a5f4457d4cee8a8fc344059718b26f7fe0f06a@ec2-34-204-242-91.compute-1.amazonaws.com:14949")
var cookieKey = 'sid'
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



const hello = (req, res) => {
	res.send({ hello: 'world!!' })
}


const addUser = (username, password) => {
    const newSalt = md5((new Date()).getTime())
    Users[username] = {username, hash: md5(password + newSalt), salt: newSalt}
}
// for registering
const postRegister = (req, res) =>{
    console.log("try to register")
    if(!req.body.name){
        console.log("please supply your username")
        res.status(400).send('please supply your username')
        return
    }
    if(!req.body.password){
        console.log("please supply your password")
        res.status(400).send('please supply your password')
        return
    }

    User.find({username:req.body.name}).exec(function(err,users){
        if(users.length != 0){
            console.log("user already exists")
            res.status(400).send('user already exists')
            return
        }
        else{
            const newSalt = md5((new Date()).getTime())
            const newHash = md5(req.body.password + newSalt)
            const userObj = new User({username : req.body.name, hash:newHash, salt: newSalt })
            const profileObj = new Profile({
                username: req.body.name, 
                dob: new Date(req.body.Bday).getTime(),  
                email: req.body.email, 
                zipcode: req.body.zipCode,
                avatar: null,
                headline: "new user" ,
                following:[]
            })
            new User(userObj).save(function(err,user){
                console.log("107")
                if(err) throw err
            })
            new Profile(profileObj).save(function(err,profile){
                console.log("111")
                if(err) throw err
            })
            console.log("successfully register")
            res.send({
                
                username: req.body.name,
                status: 'success'
            })
        }

    })
}
// for login in
const postLogin = (req, res) =>{
    console.log("try to log in")
    //console.log(req)
    if(!req.body.username || !req.body.password){
        console.log('128')
        res.status(401).send('Unauthorized')
        return
    }

    User.find({username:req.body.username}).exec(function(err,users){
        if(users === null || users.length === 0){
            console.log('135')
            res.status(401).send('Unauthorized')
            return
        }
        var userObj = users[0]
        if(userObj && md5(req.body.password + userObj.salt) == userObj.hash){
            const rand = Math.random()
            const now = new Date()
            const sessionId = md5(now.getTime() * rand)
            redis.hmset(sessionId, userObj)

            res.cookie('sid', sessionId, {maxAge: 3600*1000, httpOnly:true})
            res.send({username:userObj.username, status:'success'})
            console.log('success')
        }
        else{
            console.log('150')
            res.status(401).send('Unauthorized')
            return
        }


    })
}
// for changing password
function postPassword(req, res){
    console.log('try to post password')
    console.log(req.body.password)
    console.log(req.user)
    if(!req.body.password){
        res.status(401).send('please input password')
        return
    }

    User.find({username:req.user}).exec(function(err,users){
        const userObj = users[0]
        console.log(userObj)
        const oldSalt = userObj.salt
    	const oldHash = userObj.hash
        const newSalt = md5((new Date()).getTime())
        const newHash = md5(req.body.password + newSalt)
        User.update({username: req.user}, {$set:{salt: newSalt, hash: newHash}},
            {new : true}, function(err, user){
                if(err) throw err
                else{
                    res.send({
                        username: req.user,
                        status: 'success'
                    })
                }
            })
        })
}
// for logout
const logout = (req, res) =>{
    console.log('logout')
    //res.redirect('/')
    redis.del(req.cookies[cookieKey])
	res.clearCookie(cookieKey)
    res.status(200).send('OK')
}

// to test if it is logged in
const isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn')
    let sid = req.cookies['sid']
    //console.log(sid)
    if(!sid){
        console.log('186')
        res.sendStatus(401)
        return;
    }
    else{
        //console.log('there is sid')
        redis.hgetall(sid, function(err, userObj){
            
            //console.log(sid + ' mapped to ')
            if(userObj){
                console.log(userObj.username)
                req.user = userObj.username
                next()
            }
            else{
                res.redirect('/login')
            }
        })
    }
}


/*
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}
*/

const fail = (req, res) => {
    res.send('failed to login')
}
const profile = (req, res) => {
    res.send('ok now what?', req.user)
}

module.exports = app =>{
    app.use(cookieParser())
    
    // app.use(passport.initialize())
    // app.use(passport.session())
    app.get('/', hello)
    app.post('/login', postLogin)
    app.post('/register', postRegister)
    //app.put('/logout',logout)
    app.use(isLoggedIn)
    app.use(session({ secret: 'thisisalonglongsecret'}))
    app.put('/logout',logout)
    app.use('/login/facebook', passport.authenticate('facebook', {scope: 'email'}))
    app.use('/auth/callback', passport.authenticate('facebook', {successRedirect:'/profile', failureRedirect:'/fail'}))
	// app.use('/profile', profile)
    app.put('/password', postPassword)
	app.use('/fail', fail)
}