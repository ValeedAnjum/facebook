const intState = {
    uploading:false,
    uploadingPercentage:null,
    uploadingError:null,
    onlineUsers:[]
}

export const UserReducer = ( state = intState , action ) => {
    switch (action.type) {
        case 'UPLOADING_START':
            return {...state,uploading:true};
        case 'UPLOADING_END':
            return {...state,uploading:false};
        case 'UPLOADING_PROGRESS':
            return {...state,uploadingPercentage:action.payload}
        case 'FTECH_ONLINE_USERS_START':
            return {...state,onlineUsers:[]}
        case 'FTECH_ONLINE_USERS_SUCCESS':
            return {...state,onlineUsers:action.payload}
            
        default:
            return state;
    }
}