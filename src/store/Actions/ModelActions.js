export const OpenUploadProfilePicture = () => dispatch => {
    dispatch({type:'UPLOAD_PROFILE_PICTURE_MODEL_OPEN'});
}

export const CloseUploadProfilePicture = () => (dispatch,getState) => {
    dispatch({type:'UPLOAD_PROFILE_PICTURE_MODEL_CLOSE'});
}