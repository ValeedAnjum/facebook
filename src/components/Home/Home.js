import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logOut } from '../../store/Actions/UserActions'

const Home = ({auth,logOut}) => {
    if(!auth){
        return <Redirect to="/" />
    }
    return (
        <div onClick={logOut}>
            I am Home
        </div>
    )
}
const mapState = state => {
    return {
        auth:state.firebase.auth.uid
    }
}
const mapDispatch = dispatch => {
    return {
        logOut:() => dispatch(logOut())
    }
}
export default connect(mapState,mapDispatch)(Home);
