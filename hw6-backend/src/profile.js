const profile = {
    profile: {
        'yy55':{
            email:'yy@rice.edu',
            zipcode:12345,
            avatar:'sample',
            dob: (new Date('11/11/1911')).toDateString()
        },
        'evita':{
            email:'evita@rice.edu',
            zipcode:54321,
            avatar:'sample',
            dob: (new Date('12/12/1911')).toDateString()
        }
    },
    headlines:{
        'yy55':'I am a headline',
        'evita':'I am another headline'
    }
}

const getHeadline = (req, res) =>{
    console.log('try to get headline')
    if(!req.user) req.user = 'yy55'
    const users = req.params.users ? req.params.users.split(',') : [req.user]
    const headlines = users.map((v) =>{
        return {
            username:v,
            headline:profile.headlines[v]
        }
    })

    res.send({headlines})
}

const putHeadline = (req, res)=>{
    console.log('try to post a headline')
    if (!req.user) req.user = 'yy55'
    profile.headlines[req.user] = req.body.headline
    res.send({username: req.user, headline: profile.headlines[req.user]})
}

const getEmail = (req, res) =>{
    console.log('try to get an email')
    if (!req.user) req.user = 'yy55'
    const user = req.params.user ? req.params.user  : req.user
    res.send({
		username: user,
		email: profile.profile[user].email	
	})
}

const putEmail = (req, res) => {
    console.log('try to put an email')
	if (!req.user) req.user = 'yy55'

	profile.profile[req.user].email = req.body.email

	res.send({username: req.user, email: profile.profile[req.user].email})
}

const getZipcode = (req, res) =>{
    console.log('try to get an zipcode')
    if (!req.user) req.user = 'yy55'
    const user = req.params.user ? req.params.user  : req.user
    res.send({
		username: user,
		zipcode: profile.profile[user].zipcode	
	})
}

const putZipcode = (req, res) => {
    console.log('try to put a zipcode')
	if (!req.user) req.user = 'yy55'

	profile.profile[req.user].zipcode = parseInt(req.body.zipcode)

	res.send({username: req.user, zipcode: profile.profile[req.user].zipcode})
}

const getDob = (req, res) =>{
    console.log('try to get a birthday')
	if (!req.user) req.user = 'yy55'

	const user = req.user 
	res.send({
		username: user,
		dob: profile.profile[user].dob	
	})
}

const getAvatars = (req, res) => {
    console.log('try to get a avatar')
	if (!req.user) req.user = 'yy55'

	const user = req.params.user ? req.params.user : req.user

	res.send({
		username: user,
		avatar: profile.profile[user].avatar	
	})
}

const putAvatar = (req, res) => {
    console.log('try to post a avatar')
	if (!req.user) req.user = 'yy55'

	profile.profile[req.user].avatar = req.body.avatar

	res.send({username: req.user, avatar: profile.profile[req.user].avatar})
}

module.exports = app => {
    app.get('/headlines/:users?', getHeadline)
    app.put('/headline', putHeadline)
    app.get('/email/:user?', getEmail)
    app.put('/email', putEmail)
    app.get('/zipcode/:user?', getZipcode)
    app.put('/zipcode', putZipcode)
    app.get('/dob',getDob)
    app.get('/avatars/:user?', getAvatars)
    app.put('/avatar', putAvatar)
}