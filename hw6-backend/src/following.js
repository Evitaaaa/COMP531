const following = {
    following:{
        'yy55':['other1','other2'],
        'other1':['other2'],
        'other2':['other1', 'yy55']
    }
}

const getFollowing = (req, res) =>{
    if (!req.user) req.user = 'yy55'

    const user = req.params.user ? req.params.user : req.user

    res.send({
        username: user,
        following: following.following[user]
    })
}

const putFollowing = (req, res) =>{
    if (!req.user) req.user = 'yy55'

    if (following.following[req.user].indexOf(req.params.user) == -1){
        following.following[req.user].push(req.params.user)
    }

    res.send({
        username: req.user,
        following: following.following[req.user]
    })
}

const deleteFollowing = (req, res)=>{

    if (!req.user) req.user = 'yy55'

    const newfollowing = following.following[req.user].filter((v)=>{
        return v != req.params.user
    })

    following.following[req.user] = newfollowing

    res.send({
        username: req.user,
        following: following.following[req.user]
    })
}

module.exports = app => {

    app.get('/following/:user?', getFollowing)
    app.put('/following/:user', putFollowing)
    app.delete('/following/:user', deleteFollowing)
}


