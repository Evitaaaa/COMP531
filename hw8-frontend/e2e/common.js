import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
    username: 'yy55test',
    password: 'began-track-suffer'
}

exports.login = () =>
    sleep(500)
    .then(findId('loginName').clear())
    .then(findId('loginPassword').clear())
    .then(findId('loginName').sendKeys(exports.creds.username))
    .then(findId('loginPassword').sendKeys(exports.creds.password))
    .then(findId('login').click())
    .then(sleep(2000))


exports.logout = () => 

    sleep(500)
    .then(findId('logout').click())
    .then(sleep(500))
    .then(expect(findId('login')).to.be.ok)
    .then(sleep(500))