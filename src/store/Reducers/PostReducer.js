import * as constants from "../Constants/Constants"

const initState = {
    post:[],
    loading:false,
    postComments:null,
    commentReplies:null,
    loadingComments:false
}

export const PostReducer = (state = initState, action ) => {
    switch (action.type) {
        case constants.FETCH_POST_START:
            return {...state,loading:true,post:[]}
        case constants.FETCH_POST_SUCCESS:
            return {...state,loading:false,post:action.payload}
        case constants.FETCH_POST_COMMENTS_START:
            return {...state,loadingComments:true,postComments:[]}
        case constants.FETCH_POST_COMMENTS_SUCCESS:
            return {...state,postComments:action.payload,loadingComments:false}
        case constants.FETCH_POST_COMMENTS_REPLIES_START:
            return {...state,commentReplies:null}
        case constants.FETCH_POST_COMMENTS_REPLIES_SUCCESS:
            return {...state,commentReplies:action.payload}
        default:
            return state;
    }
}