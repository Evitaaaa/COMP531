'use strict'

var mongoose = require('mongoose')
require('./db.js')

var userSchema = new mongoose.Schema({
	username: String,
    hash: String, 
    salt: String,
    auth: [],
    authId: String
})

var profileSchema = new mongoose.Schema({
	username: String, 
    dob: Number,  
	headline: String, 
    following: [ String ],
    email: String,
    zipcode: String,
    avatar: String
})

var commentSchema = new mongoose.Schema({
	commentId: String,
    author: String,  
    text: String,
    date: Date
})

var articleSchema = new mongoose.Schema({
	id: String,
    author: String,
    text: String,
    date: Date, 
    img: String,  
	comments: [ commentSchema ]
})



exports.User = mongoose.model('user', userSchema)
exports.Profile = mongoose.model('profile', profileSchema)
exports.Article = mongoose.model('article', articleSchema)
exports.Comment = mongoose.model('comment', commentSchema)