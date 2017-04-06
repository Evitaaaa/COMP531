const md5 = require('md5')
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
    res.status('success')
}

module.exports = app =>{
    app.post('/login', postLogin)
    app.post('/register', postRegister)
    app.put('/logout', logout)
    app.get('/', hello)
}