const initState = {
    post:[],
    loading:false
}

export const PostReducer = (state = initState, action ) => {
    switch (action.type) {
        case 'FETCH_POST_START':
            // console.log('Fetch Start');
            return {...state,loading:true}
        case 'FETCH_POST_SUCCESS':
            // console.log(action.payload);
            return {...state,loading:false,post:action.payload}
        default:
            return state;
    }
}