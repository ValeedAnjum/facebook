const initState = {
    post:[],
    loading:false,
    commentReplies:null,
}

export const PostReducer = (state = initState, action ) => {
    switch (action.type) {
        case 'FETCH_POST_START':
            return {...state,loading:true}
        case 'FETCH_POST_SUCCESS':
            return {...state,loading:false,post:action.payload}
        case 'FETCH_POST_COMMENTS_SUCCESS':
            return {...state,commentReplies:action.payload}
        // case 'FETCH_POST_COMMENTS_REPLIES_SUCCESS':
        //     return {...state,}
        default:
            return state;
    }
}