import React from 'react';
import { connect } from 'react-redux';
import UploadProfilePicture from './UploadProfilePicture';
import { uploadProfilePicture } from '../../store/Actions/UserActions';

const ModelManager = ({ModelName,uploadProfilePicture}) => {
    switch (ModelName) {
        case 'UploadProfilePicture':
            return <UploadProfilePicture uploadProfilePicture={uploadProfilePicture} />
        default:
            return null;
    }
}

const mapState = state => {
    return {
        ModelName:state.Model.ModelName
    }
}

const mapDispatch = dispatch => {
    return {
        uploadProfilePicture:file => dispatch(uploadProfilePicture(file))
    }
}

export default connect(mapState,mapDispatch)(ModelManager);
