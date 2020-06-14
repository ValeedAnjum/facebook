import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import UserNavbar from './UserNavbar';
import UserPosts from './UserPosts';
import ListOfOnlineUsers from './ListOfOnlineUsers';
import ModelManager from '../../Models/ModelManager';

const UserHome = ( { userProfileData:{photoUrl} } ) => {

    console.log(photoUrl);
    return (
        <Fragment>
            <ModelManager />
            <section className="main">
                <div className="user-navbar-posts">
                    <UserNavbar/>
                    <UserPosts/>
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
        userProfileData:state.firebase.profile
    }
}

export default connect(mapState)(UserHome);