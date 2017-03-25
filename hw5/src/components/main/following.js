import React from 'react'
import {connect} from 'react-redux'
import { resource } from '../../actions'
import { follow, unfollow } from './followingActions'

var id = 4

const User = ({user, dispatch}) =>(
    <div>
        <img src = {user.picture} className='img-responsive center-block profileImage'/>
        <div><b>{user.name}</b></div>
        <div className='status'>{user.status}</div>
        <button className='btn' 
            onClick={() => remove({dispatch, username: user.name})}>Unfollow</button> 
        <br/>
        <br/>
    </div>
)

const Following = ({followings, dispatch}) => {
    return (
        <div>
            <h3> Following Users</h3>           
            <div>
                
                {
                    followings.map((user) =>
                    {
                        
                        return <User key={user.id} user={user} dispatch={dispatch}/>
                    })
                }
            <br/>
            </div>

            <div>
                <input id='addFollowingId' type='text' placeholder='Name'  className="form-control center-block newMember"/>
                <br/>
                <button className='btn' 
                        onClick={() => add({dispatch})}> Add New Follower</button>
            </div>
        </div>
    )
}
const add = ({dispatch}) =>{
    const myName = document.getElementById('addFollowingId')
    console.log(myName.value)

    if(myName.value ==''){
        return
    }
    else{
        dispatch(follow(myName.value))
        myName.value = ''
        return
    }
}

const remove = ({dispatch, username}) => {
    dispatch(unfollow(username))
}

export default connect(
    (state) => {
        return {
            followings: state.followings
        }
    }, null)(Following)