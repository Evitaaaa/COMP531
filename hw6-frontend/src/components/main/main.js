import React from 'react'
import {connect} from 'react-redux'
import Nav from './nav'
import Headline from './headline'
import Following from './following'
import Article from '../article/article'

const Main = (props) =>{
    return(
        <div>
            <Nav/>
            <div className='container-fluid'>
                <div className='row'>
                    <div className = 'col-md-3'>
                        <Headline />
                        <Following followings = {require('../data/followers.json').followers}/>
                    </div>
                    
                    <div className='col-md-offset-1 col-md-8'>
                        <Article/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main