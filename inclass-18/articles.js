let articles = [
    {id: 1, author: "Evita", text: "AAA"},
    {id: 2, author: "Scott", text: "BBB"},
    {id: 3, author: "Leo", text: "CCC"}
]
let nextId = 4

const getArticle = (req, res) => {
    if(req.params.id){
        res.send(articles.filter((a) => {
            return a.id == req.params.id
        }))
    }
    else{
        res.send(articles)
    }
}

const addArticle = (req, res) => {
    id = nextId
    nextId = nextId + 1
    var newArticle = {id, text: req.body.text, author: req.body.author}
    articles.push(newArticle)
    res.send(newArticle)
}

module.exports = (app) =>{
    app.get('/articles/:id?', getArticle)
    app.post('/article', addArticle)
}
