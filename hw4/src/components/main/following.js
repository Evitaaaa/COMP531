import React from 'react'
import {connect} from 'react-redux'

var id = 4

const User = ({user, remove}) =>(
    <div>
        <img src = {user.picture} className='img-responsive center-block profileImage'/>
        <div><b>{user.name}</b></div>
        <div className='status'>{user.status}</div>
        <button className='btn' 
            onClick={() => remove(user.id)}>Unfollow</button> 
        <br/>
        <br/>
    </div>
)

const Following = ({followers, addFollowing, remove}) => {
    return (
        <div>
            <h3> Following Users</h3>           
            <div>
                
                {
                    followers.map((user) =>
                    {
                        return <User key={user.id} user={user} remove={remove}/>
                    })
                }
            <br/>
            </div>

            <div>
                <input id='addFollowingId' type='text' placeholder='Name'  className="form-control center-block newMember"/>
                <br/>
                <button className='btn' 
                        onClick={() => add(addFollowing)}> Add New Follower</button>
            </div>
        </div>
    )
}
const add = (addFollowing) =>{
    var myName = document.getElementById('addFollowingId').value
    if(myName ==''){
        return
    }
    else{
        addFollowing(myName)
        return
    }
}
export default connect(
    (state) => {
        return {
            followers: state.followers
        }
    },
    (dispatch) =>{
        return{
            remove: (id) => dispatch({type: 'REMOVE_USER', id}),
            addFollowing: (myName) => dispatch({type: 'ADD_FOLLOWERS', myName})
        }
    }
)(Following)