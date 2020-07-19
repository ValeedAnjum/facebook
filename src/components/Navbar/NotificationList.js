import React, {useEffect, useState, Fragment} from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
const NotificationList = ({notifications}) => {
    const [loading,
        setLoading] = useState(true);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(true);
    //     }, 500);
    // })
    console.log(notifications);
    return (
        <div className="dropdown">
            {loading
                ? <Fragment>
                        <div className="notification-header">
                            <span>Notification</span>
                            <span>Settings</span>
                            <span>Mark All as Read</span>
                        </div>
                        <p className="notification-heading-text">new</p>
                        <div className="single-notification">
                            <div className="notifictaion-user-image">
                                <img src="/style/images/user.jpg" alt="notification-user-img"/>
                            </div>
                            <div className="notification-text">
                                <p>
                                    <span>
                                        Valeed Anjum
                                    </span>
                                    created a new post
                                </p>
                            </div>
                        </div>
                        {notifications && notifications.map(singleNotific => {
                            return (
                                <div className="single-notification" key={singleNotific.id}>
                                    <div className="notifictaion-user-image">
                                        <img src="/style/images/user.jpg" alt="notification-user-img"/>
                                    </div>
                                    <div className="notification-text">
                                        <p>
                                            <span>
                                                {singleNotific.name}
                                            </span>
                                            {singleNotific.message}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
}
                        <p className="notification-heading-text">earlier</p>

                        <div className="single-notification">
                            <div className="notifictaion-user-image">
                                <img src="/style/images/user.jpg" alt="notification-user-img"/>
                            </div>
                            <div className="notification-text">
                                <p>
                                    <span>Freelancing Funda</span>
                                    has a new photo from
                                    <span>Valeed Anjum</span>
                                </p>
                            </div>
                        </div>
                    </Fragment>
                : <div className="loading-notifications">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
}
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
        orderBy: ['time', 'desc']
    }
]))(NotificationList);
