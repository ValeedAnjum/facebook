import * as constants from '../Constants/Constants';
const intState = {
    uploading:false,
    uploadingPercentage:null,
    uploadingError:null,
    onlineUsers:[]
}

export const UserReducer = ( state = intState , action ) => {
    switch (action.type) {
        case constants.UPLOADING_START:
            return {...state,uploading:true};
        case constants.UPLOADING_END:
            return {...state,uploading:false};
        case constants.UPLOADING_PROGRESS:
            return {...state,uploadingPercentage:action.payload}
        case constants.FTECH_ONLINE_USERS_START:
            return {...state,onlineUsers:[]}
        case constants.FTECH_ONLINE_USERS_SUCCESS:
            return {...state,onlineUsers:action.payload}
            
        default:
            return state;
    }
}