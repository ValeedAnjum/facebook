const intState = {
    ModelName:null
}

export const ModelReducer = ( state = intState , action ) => {
    switch (action.type) {
        case 'UploadProfilePicture':
            return {...state,ModelName:'UploadProfilePicture'}
        case 'CloseUploadProfilePicture':
            return {...state,ModelName:'CloseUploadProfilePicture'}
        default:
            return state;
    }
}