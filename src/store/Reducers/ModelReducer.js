const intState = {
    ModelName:null
}

export const ModelReducer = ( state = intState , action ) => {
    switch (action.type) {
        case 'UPLOAD_PROFILE_PICTURE_MODEL_OPEN':
            return {...state,ModelName:'UPLOAD_PROFILE_PICTURE_MODEL_OPEN'}
        case 'UPLOAD_PROFILE_PICTURE_MODEL_CLOSE':
            return {...state,ModelName:'UPLOAD_PROFILE_PICTURE_MODEL_CLOSE'}
        case 'LOGIN_START':
        case 'REGISTRATION_START':
        case 'LOGOUT_START':
            return {...state,ModelName:'ASYNCHRONOUS_START_MODEL'}
        case 'LOGIN_SUCCESS':
        case 'REGISTRATION_SUCCESS':
        case 'LOGOUT_SUCCESS':
            return {...state,ModelName:null}
        case 'REGISTRATION_ERROR':
        case 'LOGIN_ERROR':
        case 'LOGOUT_ERROR':
            return {...state,error:action.payload,ModelName:'DISPLAY_ERROR_MODEL'}
        
        default:
            return state;
    }
}