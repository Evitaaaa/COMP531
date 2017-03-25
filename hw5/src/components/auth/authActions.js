import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {resource} from '../../actions'
import {initArticles} from '../article/articleActions'
import {initFollowing} from '../main/followingActions'


export function init(name){
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
            dispatch({ type:'INIT_USER', user: user })
        })    

    }
}

export function loginAction({username, password}){
    return (dispatch) =>{
        resource('POST', 'login', {username, password})
        .then((response)=>{
            dispatch({type: 'LOG_IN', username: response.username})
            dispatch(init(username))
        })
        .catch((err) => {
            console.log(err)
            dispatch({type: 'LOG_IN_MSG', logErrMsg: "Fail to log in as " + username})
        })
    }
}
export function logoutAction(){
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
            dispatch({type: 'REGISTER_MSG', regMsg: 'Fail to register'})
        })
    }
}