import React, {Component} from 'react'
import { connect } from 'react-redux'
import Register from './register'
import Login from './login'

const Landing = () => {
    return(
        <div className='container-fluid'>
            <div className='row'>
                <h1> Welcome to RiceBook </h1>
            </div>
            <div className='landing'>
                <div className='row'>
                    
                    <div className='col-md-offset-1 col-md-4 register'>
                        <h2> Register </h2>
                        <Register />
                    </div>
                    
                    <div className='col-md-offset-2 col-md-4 login'>
                        <h2> Log In </h2>
                        <Login />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default connect()(Landing)
