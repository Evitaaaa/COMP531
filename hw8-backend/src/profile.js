
const uploadImage = require('./uploadCloudinary')
const Profile = require('./model.js').Profile


// for getting headline
const getHeadline = (req, res) =>{
    console.log('try to get headline')
    //console.log(req)
    const users = req.params.users ? req.params.users.split(',') : [req.user]
    console.log()
    Profile.find({username: {$in: users}}).exec(function(err, profiles){
        if(profiles == null || profiles.length === 0){
            res.status(400).send('Error')
            return 
        }
        var headlines = []
        profiles.forEach(profile => {
    		headlines.push({username: profile.username, headline: profile.headline})
    	})
    	res.status(200).send({headlines: headlines})
        console.log('success')

    })
    
    
}
// for updating new headline
const putHeadline = (req, res)=>{
    console.log('try to post a headline')
    const user = req.user
    const newHeadline = req.body.headline
    if(!newHeadline){
        res.status(400).send('no content')
    }
    Profile.update({username: user}, { $set: {headline: newHeadline}}, {new: true}, function(err, profile){
		if(err) throw err
		else {
			res.send({username: user, headline:newHeadline})
		}
	})
    
}
// for getting email
const getEmail = (req, res) =>{
    console.log('try to get an email')
    const user = req.params.user ? req.params.user  : req.user
    Profile.find({username:user}).exec(function(err, profile){
        if(profile === null || profile.length == 0){
            res.status(401).send("error when getting email")
            return
        }
        else{
            res.send({
		        username: user,
		        email: profile[0].email	
	        })
            console.log('success')

        }
    })
    
    
}
// for putting email
const putEmail = (req, res) => {
    console.log('try to put an email')
    console.log(req.body.email)
	if(!req.body.email){
        //res.status(401).send("invalid email")
        return
    }

    Profile.update({username: req.user}, { $set: {email: req.body.email}}, {new: true}, function(err, profile){
		if(err) throw err
		else {
			res.status(200).send({username:req.user, email:req.body.email})
		}
	})
}
// for getting zipcode
const getZipcode = (req, res) =>{
    console.log('try to get an zipcode')
    const user = req.params.user ? req.params.user  : req.user
    Profile.find({username:user}).exec(function(err, profile){
        if(profile === null || profile.length == 0){
            res.status(401).send("error when getting zipcode")
            return
        }
        else{
            res.send({
		        username: user,
		        zipcode: profile[0].zipcode	
	        })
            console.log('success')
        }
    })
    
}
// for changing zipcode
const putZipcode = (req, res) => {
    console.log('try to put a zipcode')
    console.log(req.body.zipcode)
	if(!req.body.zipcode){
        //res.status(401).send("invalid zipcode")
        return
    }

    Profile.update({username: req.user}, { $set: {zipcode: req.body.zipcode}}, {new: true}, function(err, profile){
		if(err) throw err
		else {
			res.status(200).send({username:req.user, zipcode:req.body.zipcode})
		}
	})
}
// for getting birthday
const getDob = (req, res) =>{
    console.log('try to get a birthday')

	const user = req.user 
    Profile.find({username:user}).exec(function(err,profile){
        if(err) throw err
        else{
            res.send({
		        username: user,
		        dob: profile[0].dob	
	        })
            console.log('success')
        }
    })
	
}
// for getting avatar
const getAvatars = (req, res) => {
    console.log('try to get a avatar')
    console.log(req.user)
	const users = req.params.user ? req.params.user.split(',') : [req.user]
    Profile.find({username: {$in: users}}).exec(function(err, profiles){
    	if(profiles === null || profiles.length === 0) {
    		res.status(400).send("Error when getting avatars")
    		return
    	}
    	var avatars = []
    	profiles.forEach(profile => {
    		avatars.push({username: profile.username, avatar: profile.avatar})
    	})
    	res.status(200).send({avatars:avatars})
        console.log('success')
        
    })
    
}
// for adding avatar
const putAvatar = (req, res) => {
    console.log('try to post a avatar')
    console.log(req.fileurl)
    const avatar = req.fileurl
    if(!avatar){
        //res.status(400).send('invalid image')
        return
    }
    Profile.update({username: req.user}, { $set: {avatar: avatar}}, {new: true}, function(err, profile){
		if(err) throw err
		else {
            console.log('putAvatar success')
            console.log(avatar)
			res.status(200).send({username:req.user, avatar:avatar})
		}
	})

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
    app.put('/avatar', uploadImage('avatar'), putAvatar)
}