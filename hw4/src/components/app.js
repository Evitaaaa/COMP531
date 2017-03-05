import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'

const App = ({location}) =>{
    
    if(location == 'mainPage'){
        
        return (<Main/>)
    }
    
    else if(location == 'profilePage'){
        return (<Profile/>)
    }
    
    else if(location == 'landingPage'){
        return (<Landing/>)
    }
        
}

export default connect(
    (state) =>{
        
        return{
            location: state.location
        }
    }
)(App)
