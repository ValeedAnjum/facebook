import  * as constants from '../Constants/Constants';
const intState = {
    ModelName:null
}

export const ModelReducer = ( state = intState , action ) => {
    switch (action.type) {
        case constants.UPLOAD_PROFILE_PICTURE_MODEL_OPEN:
            return {...state,ModelName:constants.UPLOAD_PROFILE_PICTURE_MODEL_OPEN}
        case constants.UPLOAD_PROFILE_PICTURE_MODEL_CLOSE:
            return {...state,ModelName:constants.UPLOAD_PROFILE_PICTURE_MODEL_CLOSE}
        case constants.LOGIN_START:
        case constants.REGISTRATION_START:
        case constants.LOGOUT_START:
            return {...state,ModelName:'ASYNCHRONOUS_START_MODEL'}
        case constants.LOGIN_SUCCESS:
        case constants.LOGOUT_SUCCESS:
            return {...state,ModelName:null}
        case constants.REGISTRATION_ERROR:
        case constants.LOGIN_ERROR:
        case constants.LOGOUT_ERROR:
            return {...state,error:action.payload,ModelName:'DISPLAY_ERROR_MODEL'}
        default:
            return state;
    }
}