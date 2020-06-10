import React from 'react'

const ListOfOnlineUsers = () => {
    return (
        <div className="list-of-users">
            <div className="single-user">
                <img src="style/images/user.jpg" alt="online-img"/>
                <span>Jam Rashid</span>
                <div className="online"></div>
            </div>
            <div className="single-user">
                <img src="style/images/user.jpg" alt="online-img"/>
                <span>Jam Rashid</span>
                <div className="online"></div>
            </div>
        </div>
    )
}

export default ListOfOnlineUsers
