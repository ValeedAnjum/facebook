import React, {useState, Fragment} from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import FriendListNotifictaion from './FriendListNotifictaion'
import MessageListNotifictaion from './MessageListNotifictaion';
import NotificationList from './NotificationList';
import { withRouter, NavLink } from 'react-router-dom';

const Navbar = (props) => {
    const { auth, profileData:{photoUrl,fname}} = props;
    const [friendNotifictaion,
        setfriendNotifictaion] = useState(false);
    const [messageNotifictaions,
        setMessageNotifictaions] = useState(false);
    const [Notification,
        setNotificationList] = useState(false);
    if(!auth){
        return null;
    }
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
                            <div className="tab" >
                                {
                                    photoUrl ? <div className="user-icon" style={{backgroundImage:`url("${photoUrl}")`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}} ></div>:null
                                }
                                {fname}
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
                                Logout
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </section>
    )
}

export const mapState = state => {
    return {
        auth:state.firebase.auth.uid,
        profileData:state.firebase.profile
    }
}

export default compose(withRouter,connect(mapState))(Navbar);
