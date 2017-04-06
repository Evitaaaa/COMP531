
//import Action, { resource, updateError, updateSuccess, navToMain, navToOut} from '../../actions'
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import { loginAction } from './authActions'



const Login = ({login, dispatch, logErrMsg}) =>{

    let userInfo = {
        name: '',
        password: '',
    }
    return(
        <div>
            <form className='form-horizontal' onSubmit={(event) => {
                    event.preventDefault()
                    dispatch(loginAction({username: userInfo.name.value, password: userInfo.password.value}))
                    }}>
            <div className = 'Msg'>
                    {logErrMsg}
            </div>
                <table>
                    <tr>
			            <td> Name: </td>
			            <td><input type="text"  placeholder="Display Name" id="loginName" className="input-info"
                             required ref={(node)=>userInfo.name = node}/></td>
			        </tr>

			        <tr>
			            <td> Password: </td>
			            <td><input type="password"  placeholder="Password" name="password" id="loginPassword" required className="input-info"
                            ref={(node)=>userInfo.password = node}/></td>
			        </tr>

                    <tr>
			            <td> <input type="submit" className="btn" id="login" value="Login"/> </td>
			        </tr>
                </table>
            
            </form>

        </div>
    )
}

Login.propsType = {
    login: PropTypes.func.isRequired
}

export default connect(
    
    (state) => {
        return {
            logErrMsg: state.logErrMsg
        }
    }, null)(Login)