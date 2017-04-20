import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'


describe('Validate actions (these are functions that dispatch actions)', () =>{
    let url, resource, Reducer

    beforeEach( () =>{
        if(mockery.enable) {
            mockery.enable({warnOnUnregistered:false, useCleanCache:true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        url = require('./actions').url
        resource = require('./actions').default
        Reducer = require('./reducers').default
    })

    afterEach(() => {
        if(mockery.enable){
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('resource should be a resource (i.e., mock a request)', (done) =>{
        mock(`${url}/sample`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { sample: 'sample'}
        })

        resource('GET', 'sample').then((response) => {
            expect(response).to.exist
            
        })
        .then(done)
    })

    it('Resource should give me the http error', (done)=>{
        resource('GET', 'sample').catch((err) =>{
            expect(err).to.exist
        })
        .then(done)
    })

    it('resource should be POSTable', (done) =>{
        const username = 'yy55'
		const password = 'august-trust-sight'
       
        mock(`${url}/login`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, password}
        })

        resource('POST', 'login', {username, password}).then((response) => {
            expect(response).to.eql({username: 'yy55', password: 'august-trust-sight'})
        })
        .then(done)
    })

    it('should update error message (for displaying error mesage to user)', (done) => {
        const expectAction = {
            type: 'REGISTER_MSG',
            regMsg: 'ERROR'
        }
        const state = Reducer({regMsg: ''}, expectAction)
        expect(state.regMsg).to.eql('ERROR')
        done()
    })

    it('should update success message (for displaying success message to user)', (done) =>{
        const expectAction = {
            type: 'REGISTER_MSG',
            regMsg: 'SUCCESS'
        }
        const state = Reducer({regMsg: ''}, expectAction)
        expect(state.regMsg).to.eql('SUCCESS')
        done()
    })

    it('should navigate (to profile, main, or landing)', (done) => {
        const expectAction = {
            type: 'TO_LANDING_PAGE',
        }
        const state = Reducer({location: 'landingPage'}, expectAction)
        expect(state.location).to.eql('landingPage')
        done()
    })


})