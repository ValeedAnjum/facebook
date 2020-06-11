import { getFirestore } from "redux-firestore"
import firebase from '../../config/config';

export const fetchPost = lastPostId => {
    return async (dispatch,getState) => {
        console.log(lastPostId);
        const firestore = firebase.firestore();
        const Ref = firestore.collection('Posts').orderBy('time').limit(1);
        try {
            dispatch({type:'FETCH_POST_START'});
            const res = await Ref.get();
            dispatch({type:'FETCH_POST_SUCCESS',payload:res.docs[0].data()});
            console.log(getState().PostReducer.posts);
        } catch (err) {
            console.log(err);
        }
        
    }
}

export const addPostDumyData = () => {
    return async (dispatch,getState) => {
        const firestore = firebase.firestore();
        const Ref = firestore.collection('Posts');
        const userNumbers = [1,2,3,4,5,6,7,8,9];
        const userNames = ["Valeed","Anjum","Siddiqui","Ali","Hamza","Abid","Alisha"];
        for(let i = 0;i < 10;i++){
            let randomUserNumber = Math.floor(Math.random()*(userNumbers.length));
            let randomImageNumber = Math.floor(Math.random()*(userNumbers.length));
            let randomUserNameIndex = Math.floor(Math.random()*(userNames.length));
            await Ref.add({
                contenturl:`https://randomuser.me/api/portraits/women/${randomUserNumber}.jpg`,
                likes:0,
                name:userNames[randomUserNameIndex],
                shared:i,
                time:new Date(),
                userimage:`https://randomuser.me/api/portraits/women/${randomImageNumber}.jpg`
            })
            console.log(i);
        }
    }
}