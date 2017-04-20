import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test frontend application', () =>{
    before('should load the page', (done)=>{
        go()
        .then(done)
    })

    it('should show the register message', (done)=>{
        sleep(500)
        .then(findId('regName').sendKeys('regName'))
        .then(findId('regEmail').sendKeys('reg@rice.edu'))
        .then(findId('regPhone').sendKeys('111-111-1111'))
        .then(findId('regZipcode').sendKeys('11111'))
        .then(findId('regBday').sendKeys('01011990'))
        .then(findId('regPassword1').sendKeys('password'))
        .then(findId('regPassword2').sendKeys('password'))
        .then(findId('register').click())
        .then(sleep(500))
        .then(findId('regMsgId').getText()
        .then(text =>{
            expect(text).to.equal('Successfully register')
        })
        .then(done))
    })
    
})