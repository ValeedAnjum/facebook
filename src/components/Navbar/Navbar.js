import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FriendListNotifictaion from "./FriendListNotifictaion";
import NotificationList from "./NotificationList";
import { logOut } from "../../store/Actions/UserActions";
import ImageLoadingPlaceholder from "../ImageLoadingPlaceholder/ImageLoadingPlaceholder";

const Navbar = (props) => {
  const {
    auth,
    profileData: { photoUrl, fname },
    logOut,
  } = props;
  const [friendNotifictaion, setfriendNotifictaion] = useState(false);
  const [Notification, setNotificationList] = useState(false);
  if (!auth) {
    return null;
  }
  return (
    <section className="sec-navbar">
      <nav className="navbar">
        <div className="flex-item icon">
          <i className="fab fa-facebook-square"></i>
        </div>
        <div className="flex-item search-bar">
          <input type="text" name="search-bar" placeholder="Search" />
          <button className="search-icon-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="flex-item tabs">
          <div className="tab-container">
            <div className="ul">
              <div className="tab">
                {photoUrl ? (
                  <div
                    className="user-icon"
                    style={{
                      backgroundImage: `url("${photoUrl}")`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                ) : (
                  <ImageLoadingPlaceholder
                    style={{ width: "27px", height: "27px" }}
                  />
                )}
                {fname ? (
                  <p style={{ marginBottom: "0", marginLeft: "5px" }}>
                    {fname}
                  </p>
                ) : null}
                <div className="line"></div>
              </div>
              <div
                className="tab friend-requests"
                onClick={() => {
                  setfriendNotifictaion(!friendNotifictaion);
                  setNotificationList(false);
                }}
              >
                <i className="fas fa-user-friends"></i>
                {friendNotifictaion ? (
                  <Fragment>
                    <div
                      className="willstyleitlater"
                      style={{
                        position: "absolute",
                        marginTop: "12px",
                        left: "0",
                      }}
                    >
                      <FriendListNotifictaion />
                    </div>
                  </Fragment>
                ) : null}
              </div>

              <div
                className="tab notification"
                onClick={() => {
                  setNotificationList(!Notification);
                  setfriendNotifictaion(false);
                }}
              >
                <i className="fas fa-bell"></i>
                <div className="notification-counter">1</div>
                {Notification ? (
                  <Fragment>
                    <div
                      className="willstyleitlater"
                      style={{
                        position: "absolute",
                        marginTop: "12px",
                        left: "0",
                      }}
                    >
                      <NotificationList />
                    </div>
                  </Fragment>
                ) : null}
                <div className="line"></div>
              </div>
              <div className="tab" onClick={logOut}>
                Logout
              </div>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

Navbar.propTypes = {
  auth: PropTypes.string,
  profileData: PropTypes.object,
  logOut: PropTypes.func,
};

export const mapState = (state) => {
  return { auth: state.firebase.auth.uid, profileData: state.firebase.profile };
};

export const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(logOut()),
  };
};

export default connect(mapState, mapDispatch)(Navbar);
