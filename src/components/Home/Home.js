import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Sidebar from './Sidebar';
import Posts from './Posts';
import ListOfOnlineUsers from './ListOfOnlineUsers';
import Navbar from './Navbar/Navbar';
import { OpenUploadProfilePicture } from '../../store/Actions/ModelActions';

const Home = ( { userProfileData:{photoUrl}, auth , OpenUploadProfilePicture} ) => {
    useEffect(() => {
        if(photoUrl === "") {
            OpenUploadProfilePicture();
        }
    })
    if(!auth){
        return <Redirect to="/auth" />
    }
    // if(photoUrl === ""){
    //     OpenUploadProfilePicture();
    // }
    return (
        <Fragment>
            
            <Navbar />
            <section className="main">
                <div className="user-navbar-posts">
                    <Sidebar />
                    <Posts />
                </div>
                <div className="online-user">
                    <ListOfOnlineUsers/>
                </div>
            </section>
        </Fragment>
    )
}

const mapState = state => {
    return {
        userProfileData:state.firebase.profile,
        auth:state.firebase.auth.uid
    }
}
const mapDispatch = dispatch => {
    return {
        OpenUploadProfilePicture:() => dispatch(OpenUploadProfilePicture())
    }
}
export default connect(mapState,mapDispatch)(Home);