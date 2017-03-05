import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

let userInfo = {
    name: '',
    email: '',
    phoneNum: '',
    Bday: '',
    zipCode: '',
    password: '',
    password2: '',
}

const Register = ({addUser, errMsg, setErrMsg}) =>{
    return(
        <div>
            <form className='form-horizontal' onSubmit={(event) => {
                    event.preventDefault();
                    validate(setInfo)
                    }}>
            
            
                <div className = "errMsg">
                    {errMsg}
                </div>
                
                <table>
                    <tr>
			            <td> Name: </td>
			            <td><input type="text"  placeholder="Display Name" id="dname" className="input-info"
                             ref={(node)=>userInfo.name = node}/></td>
			        </tr>

                    <tr>
			            <td> Email Address: </td>
			            <td><input type="text" placeholder="e.g. ab12@rice.edu" id="email" className="input-info"
                             pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.]+\.[A-Za-z]{2,3}$" required
                             ref={(node)=>userInfo.email = node}/></td>
			        </tr>

			        <tr>
			            <td> Phone Number: </td>
			            <td><input type="tel" placeholder="123-123-1234" className="input-info"
                             id="phone" pattern="\d\d\d-\d\d\d-\d\d\d\d" required
                             ref={(node)=>userInfo.phoneNum = node}/></td>
			        </tr>

			        <tr>
			            <td> Zipcode: </td>
			            <td><input type="text" placeholder="12345" id="zipcode" pattern="[0-9]{5}" required className="input-info"
                             ref={(node)=>userInfo.zipCode = node}/></td>
			        </tr>

                    <tr>
			            <td> BirthDay: </td>
			            <td><input type="date"  id="Bday"  required className="input-info"
                             ref={(node)=>userInfo.Bday = node}/></td>
			        </tr>

			        <tr>
			            <td> Password: </td>
			            <td><input type="password"  placeholder="Password" name="password" id="passwordId" required className="input-info"
                            ref={(node)=>userInfo.password = node}/></td>
			        </tr>

			        <tr>
			            <td> Password Confirmation: { }</td>
			            <td><input type="password"  placeholder="Repeat your password" name="cpassword" id="cpasswordId" className="input-info"
			                required ref={(node)=>userInfo.password2 = node}/></td>

			        </tr>

                    <tr>
			            <td> <input type="submit" className="btn" value="Register"/> </td>
			        </tr>
                </table>
            
            </form>

        </div>
    )
}

Register.propsType = {
    addUser: PropTypes.string.isRequired,
    errMsg: PropTypes.func.isRequired,
    setErrMsg: PropTypes.func.isRequired
}

const validate = (setErrMsg) => {
    if(userInfo.password != userInfo.password2){
        setErrMsg('Password does not match')
        return
    }
    if((new Date().getFullYear() - Number(newUserInfo.dateOfBrith.value.substring(0,4))) < 18){
        setErrMsg('You have to be 18 or older')
        return
    }
    addUser()
}
export default connect(
    (state) =>{
        return{
            errMsg: state.regErrMsg
        }
    },
    (dispatch) => {
        return {
            addUser :() => dispatch({type: 'TO_MAIN_PAGE'}),
            setInfo: (errMsg) => dispatch({type: 'REGISTER_MSG', errMsg})
        }
    }
)(Register)