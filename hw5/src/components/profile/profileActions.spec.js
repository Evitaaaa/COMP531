import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'

describe('Validate Profile actions (mocked requests)', () => {

    let url, resource, initProfile, Reducer

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                url = require('../../actions').url
                resource = require('../../actions').default
                initProfile = require('./profileActions').initProfile
                Reducer = require('../../reducers').default
            }
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should fetch the user\'s proile information', (done) =>{
        mock(`${url}/avatars`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { avatars: [{ username: 'yy55', avatar: 'pictureURL' } ]}
        })
        
         mock(`${url}/email/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { username: 'yy55', email: 'ab12@rice.com' }
        })
        
        mock(`${url}/zipcode`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { username: 'yy55', zipcode: 'newZipCode' }
        })
        mock(`${url}/dob`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            json: { username: 'yy55', dob: '02/12/2013' }
        })
        const name = 'yy55'

        console.log('[53]')
        initProfile(name)(
            (response) =>{
                expect(response.user).to.eql({
                    name:'yy55',
                    email:'ab12@rice.com',
                    picture: 'pictureURL',
                    zipCode: 'newZipCode',
                    Bday: '2/12/2013'
                })
                
                done()
            }
        )
    })

    it('should update headline', (done) =>{
        const action = {
            type:'UPDATE_STATUS',
            name:'yy55',
            status:'new status'
        }

        let state ={user:{name:'', status:''}}
        state = Reducer(state, action)
        expect(state.user.status).to.eql('new status')
        done()
    })

})