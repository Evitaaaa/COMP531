const md5 = require('md5')
const cookieParser = require('cookie-parser') 

let cookieKey = 'sid'
let users = []

function register(req, res){
	console.log(req.body)
	const username = req.body.username
	const password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	const salt = Math.random()
	const hash = md5(salt.toString() + password)
	users.push({username: username, salt: salt, hash: hash})
	res.send({username:username, salt:salt, hash:hash})
}

function isAuthorized(req, userObj){
	if(userObj.hash === md5(userObj.salt.toString() + req.body.password)){
		return true
	}
	return false
}
function generateCode(userObj){
	return userObj.hash
}

function login(req, res){
	const username = req.body.username
	const password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	const userObj = users.filter(r => { return r.username == username })[0]
	if(!userObj || !isAuthorized(req, userObj)){
		res.sendStatus(401)
		return
	}
	res.cookie(sookieKey, generateCode(userObj),
			   {MaxAge: 3600*1000, httpOnly: true})
	res.send({ username: username, result: 'success'})
}
module.exports = app => {
	app.use(cookieParser());
	app.post('/register', register)
	app.post('/login', login)
}