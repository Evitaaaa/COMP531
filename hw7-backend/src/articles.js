const Article = require('./model.js').Article
const Comment = require('./model.js').Comment
const md5 = require('md5')

// for adding article
const addArticle = (req, res) =>{
    console.log("try to add new article")
    //console.log(req)
    if(!req.body.text){
        res.status(400).send('no content in this article')
		return
    }
    const newArticle = new Article({author: req.user, 
                                    img: null, 
                                    date: req.body.date, 
                                    text: req.body.text, 
                                    comments: []})
    new Article(newArticle).save(function(err, article){
        if(err) throw err
        else{
            res.send({articles: [article]})
        }
        console.log('success')
    })

}
// for getting article
const returnArticle = (req, res) =>{
    
    if(req.params._id){
        console.log("try to get articles " + req.params._id)
        Article.find({_id: req.params._id}).exec(function(err,article){
            if(article == null || article.length === 0){
                res.status(401).send('there is no content')
				return
            }
            else{
                const articleObj = article[0]
                res.status(200).send({articles: articleObj})
            }
        })
    }
    else{
        Article.find({}).exec(function(err, articles){
			res.status(200).send({articles: articles})
		})
    }
}
// for editting article
const editArticle = (req, res) =>{
    console.log('editArticle')
    console.log(req.body)
    if(req.params.id){
        res.status(400).send('invalid id')
		return	
    }
    const ArticleId = req.params._id
    Article.find({_id: ArticleId}).exec(function(err,article){
        
        if(article == null || article.length === 0){
                res.status(401).send('there is no content')
				return
        }

        // add new comment
        if(req.body.commentId === -1){
            
            const commentId = md5(req.user + new Date().getTime())
            const commentObj = new Comment({
                commentId: commentId,
                author: req.user,
                date: new Date(),
                text: req.body.text
            })
            new Comment(commentObj).save(function(err, comment){
                if(err) throw err
            })
            Article.findByIdAndUpdate(ArticleId, {$addToSet: {comments:commentObj}}, {upsert:true, new:true}, function(err, article){})
            res.status(200).send({articles: [article]})
        }
        // edit comment
        else if(req.body.commentId){
            //console.log(Comment)
            console.log(req.body.commentId)
            Comment.find({commentId: req.body.commentId}).exec(function(err, comments){
                if(comments === null || comments.length === 0){
                    res.status(401).send('no such comment')
					return
                }
                if(comments[0].author === req.user){
                    console.log('96')
                    console.log(req.body.text)
                    Comment.update({commentId: req.body.commentId}, { $set: {text:req.body.text}}, {new:true}, function(err, comments){})
					Article.update({_id:ArticleId, 'comments.commentId':req.body.commentId}, {$set:{'comments.$.text':req.body.text}}, {new: true}, function(err, articles){})
                    res.status(200).send({articles: [article]})
                }
            })
        }
        else{
            if(article[0].author === req.user) {
				Article.findByIdAndUpdate(ArticleId, {$set: {text:req.body.text}}, {new: true}, function(err, article){
					console.log(article)
                    res.status(200).send({articles: [article]})
				})
			}
        }
    })
}

module.exports = (app) =>{
    app.get('/articles/:_id?', returnArticle)
    app.post('/article', addArticle)
    app.put('/articles/:_id', editArticle)
}