
const express = require('express')
const bodyParser = require('body-parser')

let articles = [
        {
            id: 1,
            author: "Evita",
            text: "Vestibulum sed laoreet nulla, et tristique erat."
        },
        
        {
            id: 2,
            author: "Brenda" ,
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."     
        },

        {   
            id: 3,
            author: "Justin",
            text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
        }
]
let nextId = 4;

const getArticle = (req, res) => {
    res.send({'articles': articles})
}
const addArticle = (req, res) => {
     console.log('Payload received', req.body)   
     const newArticle = {
         id : nextId,
         author: "Yan",
         text: req.body.text
     } 
     articles.push(newArticle)
     res.send(newArticle)
     nextId++;
}

const hello = (req, res) => res.send({ hello: 'world' })

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
