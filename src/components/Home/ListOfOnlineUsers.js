import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux';
import {getOnlineUser} from '../../store/Actions/UserActions';
const ListOfOnlineUsers = ({getOnlineUser, onlineUsers}) => {
    const [localOnlineUsers,
        setlocalOnlineUsers] = useState(undefined);
    useEffect(() => {
        async function getOnlineUsers() {
            console.log('a');
            await getOnlineUser()
            console.log('b');
        }
        setTimeout(function () {
            getOnlineUsers();
        }, 1000 * 2)
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
        </div>
    )
}

const mapState = state => {
    // console.log(state.User.onlineUsers);
    return {onlineUsers: state.User.onlineUsers}
}

const mapDispatch = dispatch => {
    return {
        getOnlineUser: () => dispatch(getOnlineUser())
    }
}

export default connect(mapState, mapDispatch)(ListOfOnlineUsers)
