import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Dummy Server Example Page', () => {

    const preamble = 'you are logged in as'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(500)
            .then(findId('message').getText()
                .then(text => {
                    expect(text.indexOf(preamble)).to.equal(0)
                })
                .then(done))
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        let newHeadLine = "my new headline"
        var oldHeadLine = "my old headline"
        // .sendKeys(new headline message)
        findId('newHeadline').clear()
        .then(findId('newHeadline').sendKeys(newHeadLine))
        .then(findId('headline').click())
        .then(sleep(1000))
        // verify the headline is updated
        .then(findId('message').getText().then(
            text => {expect(text.substring(text.indexOf('"'))).to.equal('"my new headline"')}
        ))
        .then(findId('newHeadline').clear())
        // .sendKeys(the old headline message)
        .then(findId('newHeadline').sendKeys("my old headline"))
        .then(findId('headline').click())
        .then(sleep(1000))
        // verify the headline is updated
         .then(findId('message').getText().then(
            text => {expect(text.substring(text.indexOf('"'))).to.equal('"my old headline"')}
        ))
        .then(done)



    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
