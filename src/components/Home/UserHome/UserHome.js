import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import UserNavbar from './UserNavbar';
import UserPosts from './UserPosts';
import ListOfOnlineUsers from './ListOfOnlineUsers';

const UserHome = () => {
    
    return (
        <section className="main">
            <div className="user-navbar-posts">
                <UserNavbar/>
                <UserPosts/>
            </div>
            <div className="online-user">
                <ListOfOnlineUsers/>
            </div>
        </section>
    )
}

const mapState = state => {
    // console.log(state);
    return {
        posts:state.firestore.ordered.posts
    }
}
const mapDispatch = dispatch => {
    return {

    }
}
export default compose(
    connect(mapState),
    firestoreConnect(props => {
        return [{
            collection:'posts'
        }]
    })
)(UserHome);
