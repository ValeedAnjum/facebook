import React from 'react'
import UploadProfilePicture from './UploadProfilePicture';

const ModelManager = ({ModelName}) => {
    switch (ModelName) {
        case 'UploadProfilePicture':
            return <h1>UploadProfilePicture</h1>
        default:
            return <UploadProfilePicture />;
    }
}

export default ModelManager;
