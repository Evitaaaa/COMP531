import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

let userInfo = {
    name: '',
    password: '',
}

const Login = ({login}) =>{
    return(
        <div>
            <form className='form-horizontal' onSubmit={(event) => {
                    event.preventDefault();
                    //console.log('click login')
                    login(userInfo.name)
                    }}>
            
                <table>
                    <tr>
			            <td> Name: </td>
			            <td><input type="text"  placeholder="Display Name" id="dname" className="input-info"
                             required ref={(node)=>userInfo.name = node}/></td>
			        </tr>

			        <tr>
			            <td> Password: </td>
			            <td><input type="password"  placeholder="Password" name="password" id="passwordId" required className="input-info"
                            ref={(node)=>userInfo.password = node}/></td>
			        </tr>

                    <tr>
			            <td> <input type="submit" className="btn" value="Login"/> </td>
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
    (state) =>{
        return{
        }
    },
    (dispatch) =>{
        return{
            login: (name) => dispatch({type:'TO_MAIN_PAGE'})
        }
    }
)(Login)