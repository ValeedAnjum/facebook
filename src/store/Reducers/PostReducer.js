const initState = {
    posts:[],
    loading:false
}

export const PostReducer = (state = initState, action ) => {
    switch (action.type) {
        case 'FETCH_POST_START':
            return {...state,loading:true}
        case 'FETCH_POST_SUCCESS':
            return {...state,loading:false,posts:action.payload}
            
        default:
            return state;
    }
}