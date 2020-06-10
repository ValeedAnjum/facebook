import React, {useState, Fragment, useEffect} from 'react'
import FriendListNotifictaion from './FriendListNotifictaion'
import MessageListNotifictaion from './MessageListNotifictaion';
import NotificationList from './NotificationList';

const Navbar = () => {
    const [friendNotifictaion,
        setfriendNotifictaion] = useState(false);
    const [messageNotifictaions,
        setMessageNotifictaions] = useState(false);
    const [Notification,
        setNotificationList] = useState(false);
    return (
        <section className="sec-navbar">
            <nav className="navbar">
                <div className="flex-item icon">
                    <i className="fab fa-facebook-square"></i>
                </div>
                <div className="flex-item search-bar">
                    <input type="text" name="search-bar" placeholder="Search"/>
                    <button className="search-icon-button">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="flex-item tabs">
                    <div className="tab-container">

                        <div className="ul">
                            <div className="tab">
                                <div className="user-icon"></div>
                                Valeed
                                <div className="line"></div>
                            </div>
                            <div className="tab">Home
                                <div className="line"></div>

                            </div>
                            <div className="tab">create
                                <div className="line"></div>
                            </div>
                            <div className="tab friend-requests">
                                <i
                                    className="fas fa-user-friends"
                                    onClick={() => {
                                    setfriendNotifictaion(!friendNotifictaion);
                                    setMessageNotifictaions(false);
                                    setNotificationList(false)
                                }}></i>
                                {friendNotifictaion
                                    ? <Fragment>
                                            <div
                                                className="willstyleitlater"
                                                style={{
                                                position: 'absolute',
                                                marginTop: '12px',
                                                left: '0'
                                            }}>
                                                <FriendListNotifictaion/>
                                            </div>
                                        </Fragment>
                                    : null}
                            </div>
                            <div className="tab messages">
                                <i
                                    className="fab fa-facebook-messenger"
                                    onClick={() => {
                                    setMessageNotifictaions(!messageNotifictaions);
                                    setNotificationList(false);
                                    setfriendNotifictaion(false)
                                }}></i>
                                {messageNotifictaions
                                    ? <Fragment>
                                            <div
                                                className="willstyleitlater"
                                                style={{
                                                position: 'absolute',
                                                marginTop: '12px',
                                                left: '0'
                                            }}>
                                                <MessageListNotifictaion/>
                                            </div>
                                        </Fragment>
                                    : null}
                            </div>
                            <div className="tab notification">
                                <i
                                    className="fas fa-bell"
                                    onClick={() => {
                                    setNotificationList(!Notification);
                                    setMessageNotifictaions(false);
                                    setfriendNotifictaion(false)
                                }}></i>
                                <div className="notification-counter">
                                    1
                                </div>
                                {Notification
                                    ? <Fragment>
                                            <div
                                                className="willstyleitlater"
                                                style={{
                                                position: 'absolute',
                                                marginTop: '12px',
                                                left: '0'
                                            }}>
                                                <NotificationList/>
                                            </div>
                                        </Fragment>
                                    : null}
                                <div className="line"></div>
                            </div>
                            <div className="tab">
                                <i className="fas fa-question-circle"></i>
                            </div>
                            <div className="tab">
                                <i className="fas fa-sort-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Navbar;
