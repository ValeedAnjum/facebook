import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UploadProfilePicture from './UploadProfilePicture/UploadProfilePicture';
import {uploadProfilePicture} from '../../store/Actions/UserActions';
import MianScreenLoader from '../MainScreenLoader/MianScreenLoader';


const ModelManager = ({ModelName, uploadProfilePicture, uploading}) => {
    switch (ModelName) {
        case 'UPLOAD_PROFILE_PICTURE_MODEL_OPEN':
            return <UploadProfilePicture uploading={uploading}
                uploadProfilePicture={uploadProfilePicture}/>
        case 'ASYNCHRONOUS_START_MODEL':
            return <MianScreenLoader />
        default:
            return  null ;
    }
}

ModelManager.propTypes = {
    ModelName:PropTypes.string,
    uploading:PropTypes.bool,
    uploadProfilePicture:PropTypes.func
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