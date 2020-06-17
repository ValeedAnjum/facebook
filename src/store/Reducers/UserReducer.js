const intState = {
    uploading:false,
    uploadingPercentage:null,
    uploadingError:null
}

export const UserReducer = ( state = intState , action ) => {
    switch (action.type) {
        case 'UploadingStart':
            return {...state,uploading:true};
        case 'UploadingEnd':
            return {...state,uploading:false};
        default:
            return state;
    }
}