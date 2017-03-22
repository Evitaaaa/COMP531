/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

    it('should give me three or more articles', (done) => {
        // IMPLEMENT ME
        fetch(url("/articles"))
        .then((res) => {
            expect(res.status).to.eql(200)
            return res.json()
        })
        .then((articles)=>{
            expect(Object.keys(articles).length).to.be.above(2)
        })
        .then(done)
        .catch(err=>{
            throw new Error(err)
        })
    }, 200)

    it('should add two articles with successive article ids, and return the article each time', (done) => {
        // add a new article
        let article1 = {text: 'text1', author:'author1'}
        let article2 = {text: 'text2', author:'author2'}
        let firstID
        fetch(url('/article'),{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(article1)
        })
        .then((res)=>{
            expect(res.status).to.eql(200)
            return res.json()
        })
        // verify you get the article back with an id
        // verify the content of the article
        .then((body)=>{
            expect(body).to.have.ownProperty('id')
            expect(body.text).to.eql(article1.text)
            expect(body.author).to.eql(article1.author)
            return body.id
        })
        // add a second article
        // verify the article id increases by one
        // verify the second artice has the correct content
        .then( (id) => {
                fetch(url('/article'),{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(article2)
                })
                .then(res=>{
                    expect(res.status).to.eql(200)
                    return res.json()
                })
                .then((body)=>{
                    expect(body).to.have.ownProperty('id')
                    expect(body.text).to.eql(article2.text)
                    expect(body.author).to.eql(article2.author)
                    expect(body.id).to.eql(id + 1)
                })
            }
        )
        .then(done)
        .catch(err=>{
            throw new Error(err)
        })
    }, 200)

    it('should return an article with a specified id', (done) => {
        // call GET /articles first to find an id, perhaps one at random
        // then call GET /articles/id with the chosen id
        // validate that only one article is returned
        fetch(url('/articles'))
        .then(res=>{
            return Object.keys(res.json())[0]
        })
        .then((key)=>{
            fetch(url(`/articles/${key}`))
            .then(res=>{
                expect(Object.keys(res)).to.have.length(1)
            })
        })
        .then(done)
        .catch(err=>{
           throw new Error(err)
        })
    }, 200)

    it('should return nothing for an invalid id', (done) => {
        // call GET /articles/id where id is not a valid article id, perhaps 0
        // confirm that you get no results
        fetch(url("/articles/0"))
        .then(res => {
            expect(res.status).to.eql(200)  
            return res.text()               
        })
        .then(body => {
            expect(JSON.parse(body).length).to.eql(0)
        })      
        .then(done)
        .catch(done)
    }, 200)

});