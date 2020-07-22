const intState = {
    ModelName:null
}

export const ModelReducer = ( state = intState , action ) => {
    switch (action.type) {
        case 'UploadProfilePicture':
            return {...state,ModelName:'UploadProfilePicture'}
        case 'CloseUploadProfilePicture':
            return {...state,ModelName:'CloseUploadProfilePicture'}
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