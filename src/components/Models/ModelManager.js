import React from 'react';
import {connect} from 'react-redux';
import UploadProfilePicture from './UploadProfilePicture/UploadProfilePicture';
import {uploadProfilePicture} from '../../store/Actions/UserActions';


const ModelManager = ({ModelName, uploadProfilePicture, uploading}) => {
    switch (ModelName) {
        case 'UploadProfilePicture':
            return <UploadProfilePicture uploading={uploading}
                uploadProfilePicture={uploadProfilePicture}/>
        default:
            return  null ;
    }
}

const mapState = state => {
    return {
        ModelName: state.Model.ModelName,
        uploading:state.User.uploading
    }
}

const mapDispatch = dispatch => {
    return {
        uploadProfilePicture: file => dispatch(uploadProfilePicture(file))
    }
}

export default connect(mapState, mapDispatch)(ModelManager);
