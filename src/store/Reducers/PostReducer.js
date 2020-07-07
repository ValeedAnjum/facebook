const initState = {
    post:[],
    loading:false,
    postComments:null,
    commentReplies:null
}

export const PostReducer = (state = initState, action ) => {
    switch (action.type) {
        case 'FETCH_POST_START':
            return {...state,loading:true}
        case 'FETCH_POST_SUCCESS':
            return {...state,loading:false,post:action.payload}
        case 'FETCH_POST_COMMENTS_SUCCESS':
            return {...state,postComments:action.payload}
        case 'FETCH_POST_COMMENTS_REPLIES_START':
            return {...state,commentReplies:null}
        case 'FETCH_POST_COMMENTS_REPLIES_SUCCESS':
            return {...state,commentReplies:action.payload}
        default:
            return state;
    }
}