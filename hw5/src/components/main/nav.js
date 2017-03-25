import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

const Nav = ({toProfilePage, user, location,logout}) =>{
        let headline;
        return(
            <div className="navBar">
                <nav className='navbar navbar-inverse navbar-static-top'>
                    <div className='navbar-header navbar-left'>
                    <input id="goProfile" className="btn" type="submit" value="Edit Profile" 
                     onClick={(event) => 
                            {
                            event.preventDefault()
                             toProfile(location, user, toProfilePage)}}/>
                    <input id="goLanding" className="btn" type="submit" value="Log Out" 
                    onClick={(event)=>
                             {event.preventDefault();
                              logout()}}/>
                    </div>
                </nav>
            
            </div>
        )
}

const toProfile = (location, user, toProfilePage) =>{
    location='profilePage'
    toProfilePage(user)
}

export default connect(
    (state) =>{
        return{
            locaiton: state.locaiton,
            user:state.user
        }
    },
    (dispatch) =>{
        return{
            toProfilePage: (user) => dispatch({type:'TO_PROFILE_PAGE'}, user),
            logout: ()=> dispatch({type: 'LOG_OUT'})
        }
    }
)(Nav)