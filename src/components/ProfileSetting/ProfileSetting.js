import React, { Component } from 'react';
import { connect } from  'react-redux';
import { compose } from 'redux';
import { OpenUploadProfilePicture } from '../../store/Actions/ModelActions';

class ProfileSetting extends Component {
    
    render() {
        const {OpenUploadProfilePicture,currentProfilePictute} = this.props;
        return ( 
            <div className="profile-setting">
            <div className="change-profile-conatiner">
                <div className="current-profile-picture">
                    <img src={currentProfilePictute} />
                    <div className="edit-btn-container">
                        <button onClick={OpenUploadProfilePicture}>
                            <i class="fas fa-camera"></i> Change Photo
                        </button>
                    </div>
                </div>
                <h1 className="user-name">Valeed Anjum Siddiqui</h1>
            </div>
        </div>
         );
    }
}
 
const mapDispatch = dispatch => {
    return {
        OpenUploadProfilePicture:() => dispatch(OpenUploadProfilePicture())
    }
}
const mapState = state => {
    return {
        currentProfilePictute:state.firebase.profile.photoUrl
    }
}
export default connect(mapState,mapDispatch)(ProfileSetting)
