import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate reducer (no fetch requests here)', ()=>{
    let url, resource, Reducer

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                
            }
            url = require('./actions').url
            resource = require('./actions').default
            Reducer = require('./reducers').default
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should initialize state', (done) =>{
        const state = Reducer({}, {})
        expect(state).to.exist
        done()
    })

    it('should state success (for displaying success message to user)', (done) => {
        const action = {type:'REGISTER_MSG', regMsg:'SUCCESS!'}
        const state = Reducer({},action)
        expect(state.regMsg).to.eql('SUCCESS!')
        done()
    })
    it('should state success (for displaying success message to user)', (done) => {
        const action = {type:'REGISTER_MSG', regMsg:'FAIL!'}
        const state = Reducer({},action)
        expect(state.regMsg).to.eql('FAIL!')
        done()
    })
    it('should set the articles', (done) =>{
        const articles = [{id:0, author:'Evita', text:'test'}]
        const action = {type:'UPDATE_ARTICLES',articles}
        let state = Reducer({},action)
        expect(state.articles).to.eql(articles)
        expect(state.articleDis).to.eql(articles)
        done()
    })
    
    /*
    it('should set the search keyword')
    I do not key search ketword in this design
    */

    it('should filter displayed articles by the search keyword',(done)=>{
        const action = {type:'SEARCH', keywords:'a'}
        const articles = [
            {id:0, author:'Scott', text:'test'},
            {id:1, author:'Scott', text:'task'},
            {id:2, author:'Scott', text:'a'}
            ]
        let state = Reducer({articles:articles, articleDis:articles},action)
        expect(state.articleDis).to.eql([{id:1, author:'Scott', text:'task'},
            {id:2, author:'Scott', text:'a'}])
            done()
    })
})