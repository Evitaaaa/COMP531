import React from 'react'
import {connect} from 'react-redux'
import { updateHeadline } from '../profile/profileActions'
import { resource } from '../../actions'
let status
const Headline = ({user, dispatch}) =>{
    return(
        <div className='headline'>
            <img src={user.picture}
                alt='image' className='img-responsive center-block profileImage'/>
            <label className='displayName'> {user.name} </label>
            <div id='status' className='status'> {user.status}</div>
                <input id='newStatus' type='text' className="form-control" placeholder='New Status' 
                    aria-describedby="pencil-addOn"  ref = {(node) => status = node}/>
            <div>
            <button type='button' className='btn' onClick={() => 
                {updateStatus(dispatch)}}>Update Status</button>
            </div>
        </div>
    )
}

const updateStatus = (dispatch) =>{
    if(status.value != '' ){
        resource('PUT', 'headline', {headline: status.value})
        .then((response) =>{
            dispatch({type: 'UPDATE_STATUS', name : response.username, status:response.headline})
        })
        status.value = ''
    }
}

export default connect(
    (state) => {
        return {
            user: state.user
        }
    },
    null

)(Headline)
