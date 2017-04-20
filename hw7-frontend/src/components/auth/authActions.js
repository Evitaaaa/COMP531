import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {resource} from '../../actions'
import {initArticles} from '../article/articleActions'
import {initFollowing} from '../main/followingActions'
//const url = 'https://webdev-dummy.herokuapp.com'
const url = 'http://localhost:3000'

export function init(){
    return (dispatch) => {

        const user = {
            name: name,
            picture: "",
            status: "",
            email:"",
            zipCode:"",
            Bday:"",

        }
        const avatar = resource('GET', 'avatars')
        .then((response) => user.picture = response.avatars[0].avatar)
        const headline = resource('GET', 'headlines')
        .then((response) => {
            user.status = response.headlines[0].headline
            user.name = response.headlines[0].username
        })

        const email = resource('GET','email/' + name )
        .then((response) =>{
            user.email = response.email
        })
        const zipCode = resource('GET', 'zipcode/' + name)
        .then((response) =>{
            user.zipCode = response.zipcode
        })
        const Bday = resource('GET','dob')
        .then((response) =>{
            // Number(userInfo.Bday.value.substring(0,4))
            user.Bday = new Date(response.dob).toLocaleDateString()
        })
        Promise.all([avatar, headline, email, zipCode, Bday] ).then(() => {
            dispatch({type: 'LOG_IN', username: user.name})
            dispatch({type:'INIT_USER', user: user})
        })    

    }
}

export function loginAction({username, password}){
    return (dispatch) =>{
        resource('POST', 'login', {username, password})
        .then((response)=>{
            //
            
            dispatch(init())
            dispatch(initFollowing())
            dispatch(initArticles())
        })
        .catch((err) => {
            
            console.log(err)
            dispatch({type: 'LOG_IN_MSG', logErrMsg: "Fail to log in as " + username})
        })
    }
}
export function logoutAction(){
    console.log(dispatch)
    console.log('69')
    return (dispatch) =>{

        resource('PUT', 'logout')
        .then(()=>{
            dispatch({type:'LOG_OUT'})
        })
        .catch((err) =>{
            console.log(err)
        }) 
    }
}

export function registerAction(data){
    return (dispatch) => {
        resource('POST', 'register', data)
        .then(dispatch({type: 'REGISTER'}))
        .then(dispatch({type: 'REGISTER_MSG', regMsg: 'Successfully register'}))
        .catch((err) =>{
            dispatch({type: 'REGISTER_MSG', regMsg: 'No permission to register'})
        })
    }
}

export const logInFacebook = (dispatch) => {
    window.top.location = url + "/login/facebook";
}

