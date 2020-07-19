import React, {useState, useEffect, Fragment} from 'react'
import {connect} from 'react-redux';
import {getOnlineUser} from '../../store/Actions/UserActions';
const ListOfOnlineUsers = ({getOnlineUser, onlineUsers, profile:{photoUrl,fname}}) => {
    useEffect(() => {
        async function getOnlineUsers() {
            await getOnlineUser()
        }
        setTimeout(function () {
            getOnlineUsers();
        }, 3000)
    }, [])
    return (
        <div className="list-of-users">
            {onlineUsers && onlineUsers.length >= 1 && onlineUsers.map(user => {
                return (
                    <div className="single-user" key={user.id}>
                        <img src={user.photoUrl} alt="online-img"/>
                        <span>{user.fname}</span>
                        <div className="online"></div>
                    </div>
                );
            })
        }
        {
            onlineUsers && onlineUsers.length == 0 && fname && photoUrl && 
            <Fragment>
                <div className="single-user">
                    <img src={photoUrl} alt="online-img"/>
                    <span>{fname}</span>
                    <div className="online"></div>
                </div>
                <h6 style={{textAlign:'center'}}>Loading</h6>
            </Fragment>
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
