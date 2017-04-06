const articles = {
    "articles":[{"_id":1,"text":"aaaaaa","date":"2015-08-18T10:49:12.050Z","img":null,"comments":[],"author":"cjb6test"},
                {"_id":2,"text":"bbbbbb.\r","date":"2015-08-03T09:20:03.004Z","img":null,"comments":[],"author":"cjb6"},
                {"_id":3,"text":"cccccc.\r","date":"2015-06-11T18:42:24.897Z","img":null,"comments":[],"author":"gradertest"}],
    nextID: 4
}

const addArticle = (req, res) =>{
    console.log("try to add new article")
    let newArticle = {}
    newArticle._id = articles.nextID
    articles.nextID++
    newArticle.text = (req.body.text || 'blank')
    newArticle.author = (req.body.author || 'anonymous')
    newArticle.date = new Date()
    newArticle.comment = []
    articles.articles[newArticle._id] = newArticle
    res.send({articles: [newArticle]})

}

const returnArticle = (req, res) =>{
    
    if(req.params._id){
        console.log("try to get articles " + req.params._id)
        res.send({articles:[articles.articles[req.params._id]]})
    }
    else{
        console.log("try to get all articles ")
        const return_articles = Object.keys(articles.articles).map((v) =>{
            return articles.articles[v]
        })
        res.send({articles:return_articles})
    }
}

module.exports = (app) =>{
    app.get('/articles/:_id?', returnArticle)
    app.post('/article', addArticle)
}