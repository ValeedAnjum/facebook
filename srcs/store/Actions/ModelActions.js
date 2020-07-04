

export const OpenUploadProfilePicture = () => dispatch => {
    dispatch({type:'UploadProfilePicture'});
}

export const CloseUploadProfilePicture = () => (dispatch,getState) => {
    dispatch({type:'CloseUploadProfilePicture'});
}
