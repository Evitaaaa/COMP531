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
// record the orgin host
let originHostUrl = '';

const configFacebookAuth = {
	clientID:'423664881330566', 
	clientSecret:'615a1dad8ce6220407ab899f61aab8fc', 
	//callbackURL:  'http://localhost:3000/auth/callback',
    callbackURL: 'https://protected-anchorage-77582.herokuapp.com/auth/callback',
	passReqToCallback: true
}

let users = []
let redis = require('redis').createClient("redis://h:pa7e5a157252df5b6983ea82110a5f4457d4cee8a8fc344059718b26f7fe0f06a@ec2-34-204-242-91.compute-1.amazonaws.com:14949")
var cookieKey = 'sid'
// serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id)
})

// deserialize the user from the session
passport.deserializeUser(function(id, done) {
    User.findOne({authId: id}).exec(function(err, user) {
		done(null, user)
	})
})

passport.use(new FacebookStrategy(configFacebookAuth, 
    function(req, token, refreshToken, profile, done) {
        const username = profile.displayName + "@" + profile.provider
        const sid = req.cookies[cookieKey]
        if(!sid){
            User.findOne({username: username}).exec(function(err, user) {
				if(!user || user.length === 0){
					const userObj = new User({username: username, authId: profile.id})
					new User(userObj).save(function (err, usr){
						if(err) return console.log(err)
					})
					const profileObj = new Profile({username: username, headline: "login by facebook", following:[], email: null, zipcode: null, dob: new Date(1999,09,09).getTime(), avatar: "http://res.cloudinary.com/hk4d8kwix/image/upload/v1493704652/qjktjx7lsigxw9tjee2c.jpg"})
					new Profile(profileObj).save(function (err, usr){
						if(err) return console.log(err)
					})
				}
				return done(null, profile)
			})
        }
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
        console.log(userObj)
        console.log(req.body.password )
        var currHash = md5(req.body.password + userObj.salt)
        console.log('md5()')
        console.log(currHash)
        if(userObj && currHash == userObj.hash){
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
        res.send({
                    username: req.user,
                    status: 'success'
        })
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
    if (req.isAuthenticated()) {
		req.session.destroy()
		req.logout()
		//corner case for link acount
		if(req.cookies[cookieKey] !== undefined){
			const sid = req.cookies[cookieKey]
			redis.del(sid)
			res.clearCookie(cookieKey)
		}
		res.status(200).send("OK")
	} else if(req.cookies[cookieKey] !== null){
		const sid = req.cookies[cookieKey]
		redis.del(sid)
		res.clearCookie(cookieKey)
		res.status(200).send("OK")
	}
}

// to test if it is logged in
const isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn')
    let sid = req.cookies['sid']
    console.log('sid')
    console.log(sid)
    
    if (req.isAuthenticated()) {
		const usrArr = req.user.username.split('@');
		const authObj = {}
		authObj[`${usrArr[1]}`] = usrArr[0]
		User.findOne({auth: authObj}).exec(function(err,user) {
			if(!user){
				req.user = req.user.username
			} else {
				req.user = user.username
			}
			next()
		})
    }
    else{
        if(!sid){
            res.sendStatus(401)
            return;
        }
        else{
            //console.log('there is sid')
            redis.hgetall(sid, function(err, userObj){
                
                
                if(userObj){
                    console.log(sid + ' mapped to ' + userObj.username)
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

const successFun = (req,res) => {
    console.log("sf")
	res.redirect(originHostUrl)
}

const errorFun = (err,req,res,next) => {
    if(err) {
        res.status(400);
        res.send({err: err.message});
    }
}

const locationFun = (req, res, next) => {
	if(originHostUrl === ''){
		originHostUrl = req.headers.referer
	}
	next()
}

module.exports = app =>{
    app.use(cookieParser())
    app.use(locationFun)
    app.use(session({ secret: 'thisisalonglongsecret',resave: false, saveUninitialized: false}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use('/login/facebook', passport.authenticate('facebook', {scope: 'email'}))
    app.use('/auth/callback', passport.authenticate('facebook', {failureRedirect:'/login/facebook'}), successFun, errorFun)
    
    app.get('/', hello)
    app.post('/login', postLogin)
    app.post('/register', postRegister)
    app.use(isLoggedIn)
    app.put('/logout',logout)
    app.put('/password', postPassword)
	app.use('/fail', fail)
}