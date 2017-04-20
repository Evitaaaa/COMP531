
const Profile = require('./model.js').Profile

// for getting all following
const getFollowing = (req, res) =>{
    console.log('try to get following')
    const user = req.params.user ? req.params.user : req.user

    Profile.find({username: user}).exec(function(err,profile){
        if(err) throw err
        if(profile == null && profile.length == 0){
            res.status(401).send('faile to get profile')
        }
        else{
            res.status(200).send({
                username:user, 
                following: profile[0].following})           
        }
        console.log('success')
    })
    
}
// for adding new following
const putFollowing = (req, res) =>{
    // new user to follow
    const user = req.params.user
    const username = req.user
    console.log(user)
    console.log(username)
    if(!user){
        res.status(400).send('Put following error')
        return
    }

    Profile.find({username: user}).exec(function(err, profile){
        if(profile === null || profile.length == 0 ){
            console.log('invalid user')
            //res.status(400).send('invalid user')
            res.send({msg:'invalid user'})
            return
        }
        Profile.findOneAndUpdate({username: username}, { $addToSet: {following: user}}, {upsert:true, new:true}, function(err, profile){})
        Profile.find({username: username}).exec(function(err, profile){
            const profileObj = profile[0]
            res.status(200).send({username: username, following: profileObj.following})
        })
    })

    
}
// for unfollowing
const deleteFollowing = (req, res)=>{

    const user = req.params.user
    const username = req.user
    if(!user){
        res.status(400).send('Delete following error')
        return
    }

    Profile.findOneAndUpdate({username: username}, { $pull: {following: user}}, {new:true}, function(err, profile){})
    Profile.find({username: username}).exec(function(err, profile){
        const profileObj = profile[0]
        res.status(200).send({username: username, following: profileObj.following})
    })
}

module.exports = app => {

    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}


