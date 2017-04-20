import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Authentication (involves mocked requests)', () =>{
    let url, resource, loginAction, logoutAction, Reducer
    beforeEach(() =>{
        if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                url = require('../../actions').url
                resource = require('../../actions').resource
                loginAction = require('./authActions').loginAction
                logoutAction = require('./authActions').logoutAction
                Reducer = require('../../reducers').default
            }
            url = require('../../actions').url
            resource = require('../../actions').resource
            loginAction = require('./authActions').loginAction
            logoutAction = require('./authActions').logoutAction
            Reducer = require('../../reducers').default

    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should log in a user', (done) =>{
        const username = 'yy55'
		const password = 'august-trust-sight'
        
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: {username, result: 'success' }
        })
        

        loginAction({username, password})(
            (action) =>{
                expect(action).to.eql({type:'LOG_IN',username:'yy55'})
                let state = Reducer({user: "", location: ""}, action)
                expect(state.user.name).to.eql('yy55')
                expect(state.location).to.eql('mainPage')
                done()
            })
    })

    it('should not log in an invalid user', (done) =>{
        const username = 'aa'
		const password = 'bb'

        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'text/plain'},
            status: 401,
            statusText: 'Unauthorized'
        })

        loginAction({username, password})(
            (action) =>{
                expect(action).to.eql({type:'LOG_IN_MSG', logErrMsg:"Fail to log in as aa"})
                done()
            }
        )
    })

    it('should log out a user (state should be cleared)', (done) =>{
        mock(`${url}/logout`, {
            method: 'PUT',
            headers: {'Content-Type': 'text/plain'}
        })

        let state
        logoutAction()(
            (action) =>{
                expect(action.type).to.eql('LOG_OUT')
                state = Reducer(state, action)
                expect(state.user).to.eql([])
                done()
            }
        )
    })
})