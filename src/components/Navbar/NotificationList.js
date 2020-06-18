import React, {useEffect, useState, Fragment} from 'react'

const NotificationList = () => {
    const [loading,
        setLoading] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    })
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
                                    <span>Freelancing Funda</span>
                                    has a new photo from
                                    <span>Valeed Anjum</span>
                                </p>
                            </div>
                        </div>
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

export default NotificationList;
