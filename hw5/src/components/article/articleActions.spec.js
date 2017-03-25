import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Article actions', ()=>{
    let url, resource, Reducer, initArticles
    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                
            }
            url = require('../../actions').url
            resource = require('../../actions').resource
            Reducer = require('../../reducers').default
            initArticles = require('./articleActions').initArticles
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should fetch articles (mocked request)', (done) =>{
         mock(`${url}/articles`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { articles: [{id:0, author:"Evita", text:{}}]}
         })
         initArticles()(
             (response) =>{
                 console.log(response)
                 expect(response).to.eql({type: 'UPDATE_ARTICLES', articles:[{id:0, author:"Evita", text:{}}]})
                 done()
             }
         )


    })

    /*
    it('should update the search keyword')
    I do not key search ketword in this design
    */
})