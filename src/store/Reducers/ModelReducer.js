const intState = {
    ModelName:'UploadProfilePicture'
}

export const ModelReducer = ( state = intState , action ) => {
    switch (action.type) {
        case 'UploadProfilePicture':
            return {...state,ModelName:'UploadProfilePicture'}
        default:
            return state;
    }
}