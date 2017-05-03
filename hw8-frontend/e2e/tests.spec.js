import { expect } from 'chai'
import { driver,maximize, go, sleep, findId, findCSS, By } from './selenium'
import common from './common'
const webdriver = require('selenium-webdriver')

describe(' Test frontend application', () =>{
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as test user', (done) =>{
        sleep(500)
        .then(findId('currentuser').getText()
        .then(text =>{
            expect(text).to.equal('yy55test')
        })
        .then(done))
    })


    it('should create new article', (done)=>{
        const article = 'new article'
        sleep(1000)
        .then(findId('newArticle').clear())
        .then(findId('newArticle').sendKeys(article))
        .then(findId('postArtilce').click())
        .then(sleep(1000))
        .then(findId('articleTextId').getText()
        .then(text =>{
            expect(text).to.equal('new article')
        })
        .then(done))
    })

    it('should edit an article', (done)=>{
        const article = 'edited'
        sleep(500)
        .then(findId('articleTextId').clear())
        .then(findId('articleTextId').sendKeys(article))
        .then(findId('editArticleId').click())
        .then(sleep(500))
        .then(findId('articleTextId').getText()
        .then(text =>{
            expect(text).to.equal('edited')
        }))
        .then(sleep(500))
        .then(done)
        
    })

    it('should update headline', (done)=>{
        let originalHeadline = 'Test Account'
        let newheadline = 'new headline for test'
        sleep(500)
        .then(findId('status').getText().then(
            text =>{
                expect(text).to.be.eql(originalHeadline)
            }
        ))
        .then(findId('newStatus').clear())
        .then(findId('newStatus').sendKeys(newheadline))
        .then(sleep(500))
        .then(findId('statusBtn').click())
        .then(sleep(500))
        .then(findId('status').getText().then(
            text =>{
                expect(text).to.be.eql(newheadline)
            }
        ))
        .then(findId('newStatus').clear())
        .then(findId('newStatus').sendKeys(originalHeadline))
        .then(findId('statusBtn').click())
        .then(sleep(500))
        .then(done)
    })
    

    it('should add follower', (done) =>{
        let originalLength = 0
        let follower = 'Follower'
         sleep(500)
         .then(driver.findElements(webdriver.By.id('followerId'))
         .then(
             (followers)=>{
                originalLength = followers.length
                expect(followers.length).to.be.at.least(1)
             }))
        .then(findId('addFollowingId').clear())
        .then(findId('addFollowingId').sendKeys(follower))
        .then(sleep(1000))
        .then(findId('newFollowerId').click()
            .then(sleep(500))
            .then(driver.findElements(webdriver.By.id('followerId'))
            .then(
                (followers)=>{
                    expect(followers.length).to.be.eql(originalLength+1)
            }))
            .then(done))
    })

    it('should remove a follower', (done)=>{
        let originalLength = 0
         sleep(500)
         .then(driver.findElements(webdriver.By.id('followerId'))
         .then(
             (followers)=>{
                originalLength = followers.length
                expect(followers.length).to.be.at.least(1)
        }))
        .then(findId('unfoBtn').click()
            .then(sleep(500))
            .then(driver.findElements(webdriver.By.id('followerId'))
            .then(
                (followers)=>{
                    expect(followers.length).to.be.eql(originalLength-1)
            }))
            .then(done))

    })
    

    it('should search by keywords',(done)=>{
        let keyword = 'Only One Article Like This'
        sleep(500)
        .then(driver.findElements(webdriver.By.id('articleTextId'))
        .then(
            (articles) =>{
                expect(articles.length).to.be.at.least(2)
            }
        ))
        .then(findId('search').clear())
        .then(findId('search').sendKeys(keyword))
        .then(sleep(1000))
        .then(driver.findElements(webdriver.By.id('articleTextId'))
        .then(
            (articles) =>{
                expect(articles.length).to.be.eql(1)
            }
        ))
        .then(findId('search').clear())
        .then(done)

    })

    it('go to profile', (done)=>{
        sleep(500)
        .then(findId('goProfile').click())
        .then(done)
    })

    it('should update user email and verify', (done)=>{
        const oldemail = 'yy55@rice.edu'
        const newemail = 'new@email.com'
        sleep(1000)
        .then(findId('emailprofile').getText().then(text=>{
            expect(text).to.be.ok
        }))
        .then(findId('email').clear())
        .then(findId('email').sendKeys(newemail))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys('11111'))
        .then(findId('passwordId').clear())
        .then(findId('passwordId').sendKeys('123'))
        .then(findId('cpasswordId').clear())
        .then(findId('cpasswordId').sendKeys('123'))

        .then(findId('update').click())
        .then(sleep(2000))
        .then(findId('emailprofile').getText().then(text=>{
            expect(text).to.eql(newemail)
        }))
        .then(findId('email').clear())
        .then(findId('email').sendKeys(oldemail))
        .then(findId('update').click())
        .then(sleep(500))
        .then(findId('emailprofile').getText().then(text=>{
            expect(text).to.eql(oldemail)
        }))
        .then(done)
    })

    it('should update user zipcode and verify', (done)=>{

        sleep(500)
        .then(findId('zipCodeprofile').getText().then(text=>{
            expect(text).to.be.ok
        }))
        .then(findId('email').clear())
        .then(findId('email').sendKeys('evita@rice.edu'))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys('22222'))
        .then(findId('passwordId').clear())
        .then(findId('passwordId').sendKeys('123'))
        .then(findId('cpasswordId').clear())
        .then(findId('cpasswordId').sendKeys('123'))

        .then(findId('update').click())
        .then(sleep(2000))
        .then(findId('zipCodeprofile').getText().then(text=>{
            expect(text).to.eql('22222')
        }))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys('77030'))
        .then(findId('update').click())
        .then(sleep(1000))
        .then(findId('zipCodeprofile').getText().then(text=>{
            expect(text).to.eql('77030')
        }))
        .then(done)
    })
    
    it('should update user password and verify', (done)=>{

        sleep(500)
        .then(findId('email').clear())
        .then(findId('email').sendKeys('evita@rice.edu'))
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys('77030'))
        .then(findId('passwordId').clear())
        .then(findId('passwordId').sendKeys('123'))
        .then(findId('cpasswordId').clear())
        .then(findId('cpasswordId').sendKeys('123'))

        .then(findId('update').click())
        .then(sleep(2000))
        .then(findId('uptProfileMsgId').getText().then(text=>{
            expect(text).to.eql('Update successfully!')
        }))
        .then(findId('passwordId').clear())
        .then(findId('passwordId').sendKeys('12345'))
        .then(findId('cpasswordId').clear())
        .then(findId('cpasswordId').sendKeys('12345'))
        .then(findId('update').click())
        .then(sleep(500))
        .then(findId('uptProfileMsgId').getText().then(text=>{
            expect(text).to.eql('Update successfully!')
        }))
        .then(done)
    })
})