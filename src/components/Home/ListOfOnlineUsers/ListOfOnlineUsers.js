import React, {useState, useEffect, Fragment} from 'react'
import {connect} from 'react-redux';
import {getOnlineUser} from '../../../store/Actions/UserActions';
import LoadingOnlineUsers from './LoadingOnlineUsers';
import UserImageLoadingPlaceholder from './UserImageLoadingPlaceholder';
const ListOfOnlineUsers = ({getOnlineUser, onlineUsers, profile:{photoUrl,fname}}) => {
    useEffect(() => {
        async function getOnlineUsers() {
            await getOnlineUser()
        }
        getOnlineUsers();
    }, [])
    
    return (
        <div className="list-of-users">

            <div className="single-user">
                    {
                        photoUrl ? <img src={photoUrl} alt="online-img"/>:<UserImageLoadingPlaceholder />
                    }
                    <span>{fname}</span>
                    <div className="online"></div>
            </div>

            {onlineUsers && onlineUsers.length >= 1 && onlineUsers.map(user => {
                return (
                    <div className="single-user" key={user.id}>
                        {
                            (user.photoUrl === "") ? <UserImageLoadingPlaceholder />:<img src={user.photoUrl} alt="online-img"/>
                        }
                        <span>{user.fname}</span>
                        <div className="online"></div>
                    </div>
                );
            })
            }
            {
                onlineUsers && onlineUsers.length == 0 && <LoadingOnlineUsers />
            }
        </div>
    )
}

const mapState = state => {
    // console.log(state.firebase.profile);
    return {onlineUsers: state.User.onlineUsers,profile:state.firebase.profile}
}

const mapDispatch = dispatch => {
    return {
        getOnlineUser: () => dispatch(getOnlineUser())
    }
}

export default connect(mapState, mapDispatch)(ListOfOnlineUsers)
