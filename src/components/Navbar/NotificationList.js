import React, {useEffect, useState, Fragment} from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
const NotificationList = ({notifications}) => {
    return (
        <div className="dropdown">
            <Fragment>
                <div className="notification-header">
                    <span>Notification</span>
                    <span>Settings</span>
                    <span>Mark All as Read</span>
                </div>
                {notifications && notifications.map(singleNotific => {
                    const {id, name, message, photoUrl} = singleNotific;
                    return (
                        <div className="single-notification" key={id}>
                            <div className="notifictaion-user-image">
                                <img src={photoUrl} alt="notification-user-img"/>
                            </div>
                            <div className="notification-text">
                                <p>
                                    <span>
                                        {`${name} `}
                                    </span>
                                    {message}
                                </p>
                            </div>
                        </div>
                    );
                })
}
                {!notifications && <div className="loading-notifications">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
}
            {
                notifications && notifications.length === 0 && <h6>There are no notifications</h6>
            }
            </Fragment>
        </div>
    )
}

const mapState = state => {
    // console.log(state.firestore.ordered.notification);
    return {notifications: state.firestore.ordered.notification}
}

export default compose(connect(mapState), firestoreConnect([
    {
        collection: 'notification',
        limit:8,
        orderBy: ['time', 'desc']
    }
]))(NotificationList);
