import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import Register from './Register'
import { Redirect } from 'react-router-dom'

const Auth = ({auth}) => {
    if(auth){
        return <Redirect to="/home"/>
    }
    return (
        <Fragment>
            <div className="not-responsive">
                <h1>I am not responsive so open me on a big labtop or device that has a screen
                    with 900px</h1>
            </div>
            <section className="login-navbar">
                <div className="logo-login-form">
                    <div className="logo">
                        <h2>facebook</h2>
                    </div>
                    <Login />
                </div>
            </section>
            <section className="users-signup-form">
                <div className="content-conatiner">
                    <div className="column-1">
                        <h2>Facebook helps you connect and share with the people in your life.</h2>
                        <img src="style/images/users.png" alt="users-img"/>
                    </div>
                    <div className="column-2">
                        <Register />
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

const mapState = state => {
    return {
        auth:state.firebase.auth.uid
    }
}

export default connect(mapState)(Auth);
