import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {registerAction} from './authActions'

let userInfo = {
    name: '',
    email: '',
    phoneNum: '',
    Bday: '',
    zipCode: '',
    password: '',
    password2: '',
}

const Register = ({dispatch, regMsg, setMsg}) =>{
    return(
        <div>
            <form className='form-horizontal' onSubmit={(event) => {
                    event.preventDefault();
                    validate(setMsg, dispatch)
                    }}>
            
            
                <div className = 'Msg' id ='regMsgId'>
                    {regMsg}
                </div>
                
                <table>
                    <tr>
			            <td> Name: </td>
			            <td><input type="text"  placeholder="Display Name" id="regName" className="input-info"
                             ref={(node)=>userInfo.name = node}/></td>
			        </tr>

                    <tr>
			            <td> Email Address: </td>
			            <td><input type="text" placeholder="e.g. ab12@rice.edu" id="regEmail" className="input-info"
                             pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.]+\.[A-Za-z]{2,3}$" required
                             ref={(node)=>userInfo.email = node}/></td>
			        </tr>

			        <tr>
			            <td> Phone Number: </td>
			            <td><input type="tel" placeholder="123-123-1234" className="input-info"
                             id="regPhone" pattern="\d\d\d-\d\d\d-\d\d\d\d" required
                             ref={(node)=>userInfo.phoneNum = node}/></td>
			        </tr>

			        <tr>
			            <td> Zipcode: </td>
			            <td><input type="text" placeholder="12345" id="regZipcode" pattern="[0-9]{5}" required className="input-info"
                             ref={(node)=>userInfo.zipCode = node}/></td>
			        </tr>

                    <tr>
			            <td> BirthDay: </td>
			            <td><input type="date"  id="regBday"  required className="input-info"
                             ref={(node)=>userInfo.Bday = node}/></td>
			        </tr>

			        <tr>
			            <td> Password: </td>
			            <td><input type="password"  placeholder="Password" name="password" id="regPassword1" required className="input-info"
                            ref={(node)=>userInfo.password = node}/></td>
			        </tr>

			        <tr>
			            <td> Password Confirmation: { }</td>
			            <td><input type="password"  placeholder="Repeat your password" name="cpassword" id="regPassword2" className="input-info"
			                required ref={(node)=>userInfo.password2 = node}/></td>

			        </tr>

                    <tr>
			            <td> <input type="submit" className="btn" id='register' value="Register"/> </td>
			        </tr>
                </table>
            
            </form>

        </div>
    )
}


const validate = (setMsg, dispatch) => {
    if(userInfo.password.value != userInfo.password2.value){

        setMsg('Password does not match')
        return
    }
    if((new Date().getFullYear() - Number(userInfo.Bday.value.substring(0,4))) < 18){
        setMsg('You have to be 18 or older')
        return
    }
    dispatch(registerAction({
        name: userInfo.name.value,
        email: userInfo.email.value,
        phoneNum: userInfo.phoneNum.value,
        Bday: userInfo.Bday.value,
        zipCode: userInfo.zipCode.value,
        password: userInfo.password.value
    }))
}
export default connect(
    (state) =>{
        return{
            regMsg: state.regMsg
        }
    },
    (dispatch) => {
        return {
            setMsg: (regMsg) => dispatch({type: 'REGISTER_MSG', regMsg}),
            dispatch: dispatch
        }
    }
)(Register)