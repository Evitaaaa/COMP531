import React from 'react'
import {connect} from 'react-redux'
import Nav from '../main/nav'

import {updateProfile} from './profileActions'


let userProfile = {
    name: '',
    email: '',
    phoneNum: '',
    Bday: '',
    zipCode: '',
    password: '',
    password2: '',
}

let profileTitle = {
    name: 'Name',
    email: 'E-mail',
    phoneNum: 'Phone Number',
    Bday: 'Birthday',
    zipCode: 'Zip Code',
    password: 'Password'
}
const CurrentProfile = ({user}) => {
    let keySet = Object.keys(user)
    let titles = new Set(['name', 'email', 'phoneNum', 'Bday', 'zipCode', 'password'])
    return(
        <div className='CurrentProfile, content'>
            
            
            <br/>
            <table >
            <h1> Current Profile</h1>
                {keySet.map((key, index)=>{
                    if(titles.has(key)){
                        return(
                        <tr key={index} >
                            
                                <td>{profileTitle[key]}:</td>
                                <td className="show-info">{user[key]}</td>
                            
                        </tr>
                        )
                    }}
                )}
            </table>
        </div>
    )
}

const UpdateProfile = ({user, dispatch, uptProfileMsg, setMsg}) =>{
    return(
        <div className='updateProfile content'>
            
            <form className='form-horizontal' onSubmit={(event) => {
                    event.preventDefault();
                    validate(setMsg, updateProfile, dispatch, user)
                    }}>
                <div className='Msg'>
                    {uptProfileMsg}
                </div>

                <br/>
                <table align="center">
                   <h1>Update Profile</h1>
                    <tr>
			            <td> Email Address: </td>
			            <td><input type="text" placeholder="e.g. ab12@rice.edu" id="email" 
                             pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.]+\.[A-Za-z]{2,3}$" required
                             defaultValue={user.email} className="input-info"
                             ref={(node)=>userProfile.email = node}/></td>
			        </tr>

			        <tr>
			            <td> Zipcode: </td>
			            <td><input type="text" placeholder="12345" id="zipcode" pattern="[0-9]{5}" required
                             defaultValue={user.zipCode} className="input-info"
                             ref={(node)=>userProfile.zipCode = node}/></td>
			        </tr>

			        <tr>
			            <td> Password: </td>
			            <td><input type="password"  placeholder="Password" name="password" id="passwordId" required
                            defaultValue={user.password} className="input-info"
                            ref={(node)=>userProfile.password = node}/></td>
			        </tr>

			        <tr>
			            <td> Password Confirmation: { }</td>
			            <td><input type="password"  placeholder="Repeat your password" name="cpassword" id="cpasswordId"
			                defaultValue={user.password2} className="input-info"
                            required ref={(node)=>userProfile.password2 = node}/></td>

			        </tr>
                    <tr>
			            <td> <input type="submit" className="btn" value="Update"/> </td>
			        </tr>
                </table>
            </form>
        </div>
    )
}

const  validate = (setMsg, updateProfile, dispatch,user) => {
    
    if(userProfile.password.value != userProfile.password2.value){
        setMsg('Passwords do not match')
        return
    }
    
    
    dispatch(updateProfile ({
        name: user.name,
        email: userProfile.email.value,
        zipCode: userProfile.zipCode.value,
        password: userProfile.password.value
    }))
    setMsg('Update successfully!')
    
}
//user, updateFunc, updateMsg, setMsg
const Profile = ({user, dispatch, uptProfileMsg, setMsg}) =>{
    return(
        <div>
            <Nav user={user}/>
            <div className='container-fluid content'>
                <div className='row'>
                   
                    <div className='col-md-4 col-md-offset-1 profileImg'>
                        
                        <div className='row'>
                        <img src = {user.picture} alt='image' 
                            className='img-responsive center-block profileImage' />
                        </div>
                       
                        <div className='row'>
                            <label className='col-md-6'> Update Your Picture: </label> 
                            <input className='col-md-6'type='file' />
                        </div>

                    </div>
                </div>
            </div>

            
            <div className='row'>
                <div className=' col-md-offset-1 col-md-5'>
                    <CurrentProfile user={user} />
                </div>
                <div className='col-md-5'>
                    <UpdateProfile user={user} uptProfileMsg={uptProfileMsg} setMsg={setMsg} dispatch={dispatch}/>
                </div>
            </div>
            

        </div>
    )
}

export default connect(
    
    (state) =>{
        console.log(state.user)
        return{
            user: state.user,
            uptProfileMsg: state.uptProfileMsg
        }
    },
    (dispatch) =>{
        return{
            setMsg : (uptProfileMsg) => dispatch({type: 'UPDATE_PROFILE_MSG', uptProfileMsg}),
            dispatch: dispatch
        }

    }
)(Profile)