import React, {Fragment, useEffect} from 'react'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import Sidebar from './Sidebar';
import Posts from './Posts';
import ListOfOnlineUsers from './ListOfOnlineUsers';
import {OpenUploadProfilePicture} from '../../store/Actions/ModelActions';
import { setPresenceOnline, setPresenceOffline } from '../../store/Actions/UserActions';

const Home = ({profileData: {
        photoUrl
    }, auth, OpenUploadProfilePicture, setPresenceOnline, setPresenceOffline}) => {
    useEffect(() => {
        if (photoUrl === "") {
            OpenUploadProfilePicture();
        }
        window.onbeforeunload = function() {
            setPresenceOffline();
        }
    })
    if (!auth) {
        return <Redirect to="/auth"/>
    }
    if(auth){
        setPresenceOnline();
    }
   
    return (
        <Fragment>
            <section className="main">
                <div className="user-navbar-posts">
                    <Sidebar photoUrl={photoUrl}/>
                    <Posts photoUrl={photoUrl}/>
                </div>
                <div className="online-user">
                    {/* <ListOfOnlineUsers/> */}
                </div>
            </section>
        </Fragment>
    )
}

const mapState = state => {
    return {
        profileData: state.firebase.profile, 
        auth: state.firebase.auth.uid
    }
}
const mapDispatch = dispatch => {
    return {
        OpenUploadProfilePicture: () => dispatch(OpenUploadProfilePicture()),
        setPresenceOnline:() => dispatch(setPresenceOnline()),
        setPresenceOffline:() => dispatch(setPresenceOffline())
    }
}
export default connect(mapState, mapDispatch)(Home);