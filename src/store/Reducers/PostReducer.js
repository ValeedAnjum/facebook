const initState = {
    posts:[],
    loading:false
}

export const PostReducer = (state = initState, action ) => {
    switch (action.type) {
        case 'FETCH_POST_START':
            return {...state,loading:true}
        case 'FETCH_POST_SUCCESS':
            console.log(action.payload);
            return {...state,loading:false,posts:[...state.posts,action.payload]}
        default:
            return state;
    }
}