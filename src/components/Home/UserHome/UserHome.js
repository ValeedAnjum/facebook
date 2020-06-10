import React from 'react'
import UserNavbar from './UserNavbar';
import UserPosts from './UserPosts';
import ListOfOnlineUsers from './ListOfOnlineUsers';

const UserHome = () => {
    
    return (
        <section className="main">
            <div className="user-navbar-posts">
                <UserNavbar/>
                <UserPosts />
            </div>
            <div className="online-user">
                <ListOfOnlineUsers/>
            </div>
        </section>
    )
}

export default UserHome;
