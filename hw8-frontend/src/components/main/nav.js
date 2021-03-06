import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { resource } from '../../actions'

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
                    <input id="logout" className="btn" type="submit" value="Log Out" 
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
            logout: ()=> {
                console.log('put logout')
                resource('PUT','logout')
                .then((response) =>{dispatch({type: 'LOG_OUT'})})
            }
        }
    }
)(Nav)