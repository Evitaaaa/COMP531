
import React, { Component, PropTypes } from 'react'
import {expect} from 'chai'
import {shallow} from 'enzyme'
import mockery from 'mockery'
import { ArticlesView } from './articlesView'

describe('ArticlesView (component tests)', ()=>{
    let url, resource, Reducer, addArticle

    beforeEach(() => {
            if(mockery.enable) {
                mockery.enable({warnOnUnregistered: false, useCleanCache:true})
                mockery.registerMock('node-fetch', fetch)
                require('node-fetch')
                
            }
            url = require('../../actions').url
            resource = require('../../actions').default
            Reducer = require('../../reducers').default
            addArticle = require('./articleActions').addArticle
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })

    it('should render articles', (done) =>{
        const articles = [{id:0, author:'Evita', date:'3/24/2017', comments:[]}]
        console.log('[line: 31]' + articles )
        const node = shallow(
            <ArticlesView articles={articles}  search={_=>_}/>
        )
        console.log('[line: 35]' + node)
        expect(node.children().length).to.eql(2)
        expect(node.find('table').children().length).to.eql(1)
        done()
    })

    it('should dispatch actions to create a new article', (done)=>{
        const state = Reducer({articles:[]}, {type: 'ADD_ARTICLE', text: 'article2'})
        const node = shallow(
                <ArticlesView articles={state.articles} search={_=>_} />
        )

        expect(node.children().length).to.eql(2)
        expect(node.find('table').children().length).to.eql(1)
        done()
    })


})