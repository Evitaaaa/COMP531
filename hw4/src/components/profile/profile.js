import React from 'react'
import {connect} from 'react-redux'
import Nav from '../main/nav'


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
    console.log(profileTitle)
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

const UpdateProfile = ({user, updateFunc, updateMsg, setMsg}) =>{
    return(
        <div className='updateProfile content'>
            
            <form className='form-horizontal' onSubmit={(event) => {
                    event.preventDefault();
                    validate(setMsg, updateFunc)
                    }}>
                <div className='updateMsg'>
                    {updateMsg}
                </div>

                <br/>
                <table align="center">
                   <h1>Update Profile</h1>
                    <tr>
			            <td> Name: </td>
			            <td><input type="text"  placeholder="Display Name" id="dname" required='required' 
                             defaultValue={user.name} className="input-info"
                             ref={(node)=>userProfile.name = node}
                             /></td>
			        </tr>

                    <tr>
			            <td> Email Address: </td>
			            <td><input type="text" placeholder="e.g. ab12@rice.edu" id="email" 
                             pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.]+\.[A-Za-z]{2,3}$" required
                             defaultValue={user.email} className="input-info"
                             ref={(node)=>userProfile.email = node}/></td>
			        </tr>

			        <tr>
			            <td> Phone Number: </td>
			            <td><input type="tel" placeholder="123-123-1234" 
                             id="phone" pattern="\d\d\d-\d\d\d-\d\d\d\d" required
                             defaultValue={user.phoneNum} className="input-info"
                             ref={(node)=>userProfile.phoneNum = node}/></td>
			        </tr>

			        <tr>
			            <td> Zipcode: </td>
			            <td><input type="text" placeholder="12345" id="zipcode" pattern="[0-9]{5}" required
                             defaultValue={user.zipCode} className="input-info"
                             ref={(node)=>userProfile.zipCode = node}/></td>
			        </tr>

                    <tr>
			            <td> BirthDay: </td>
			            <td><input type="date"  id="Bday"  required
                             defaultValue={user.Bday} className="input-info"
                             ref={(node)=>userProfile.Bday = node}/></td>
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
			            <td> <input type="submit" className="btn" value="Register"/> </td>
			        </tr>
                </table>
            </form>
        </div>
    )
}

const validate = (setMsg, updateFunc) => {
    if(userProfile.password.value != userProfile.password2.value){
        setMsg('passwords do not match')
        return
    }
    updateFunc(
        {
            name: userProfile.name.value,
            email: userProfile.email.value,
            phoneNum: userProfile.phoneNum.value,
            zipCode: userProfile.zipCode.value,
            password: userProfile.password.value
        }
    )
}

const Profile = ({user, updateProfile, updateMsg, setMsg}) =>{
    return(
        <div>
            <Nav user={user}/>
            <div className='container-fluid content'>
                <div className='row'>
                   
                    <div className='col-md-4 col-md-offset-1 profileImg'>
                        
                        <div className='row'>
                        <img src = 'images/evita.jpg' alt='image' 
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
                    <UpdateProfile user={user} updateMsg={updateMsg} setMsg={setMsg} updateProfile={updateProfile}/>
                </div>
            </div>
            

        </div>
    )
}

export default connect(
    (state) =>{
        return{
            user: state.user,
            updateMsg: state.updateMsg
        }
    },
    (dispatch) =>{
        return{
            setMsg : (updateMsg) => dispatch({type: 'UPDATE_MSG', updateMsg}),
            updateFunc : (newProfile) => dispatch({type: 'UPDATE_PROFILE', newProfile})
        }

    }
)(Profile)