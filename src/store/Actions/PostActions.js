import firebase from '../../config/config';

export const fetchPost = lastPostId => {
    return async(dispatch, getState) => {
        // console.log(lastPostId);
        const firestore = firebase.firestore();
        const Ref = firestore.collection('Posts');
        try {
            const lastItem = lastPostId && (await firestore.collection('Posts').doc(lastPostId).get());
            let query;
            lastItem
                ? (query = Ref.orderBy('time').startAfter(lastItem).limit(3))
                : (query = Ref.orderBy('time').limit(3));
            dispatch({type:'FETCH_POST_START'});
            let querySnap = await query.get();
            if(querySnap.docs.length === 0) {
                return querySnap;
            }
            let post = [];
            for(let i = 0;i<querySnap.docs.length;i++){
                post.push({...querySnap.docs[i].data(),id:querySnap.docs[i].id});
            }
            dispatch({type:'FETCH_POST_SUCCESS',payload:post});
            // console.log(getState().PostReducer.post);
            return querySnap;
        } catch (err) {
            console.log(err);
        }

    }
}

export const addPostDumyData = () => {
    return async(dispatch, getState) => {
        const firestore = firebase.firestore();
        const Ref = firestore.collection('Posts');
        const userNumbers = [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ];
        const userNames = [
            "Valeed",
            "Anjum",
            "Siddiqui",
            "Ali",
            "Hamza",
            "Abid",
            "Alisha"
        ];
        for (let i = 0; i < 10; i++) {
            let randomUserNumber = Math.floor(Math.random() * (userNumbers.length));
            let randomImageNumber = Math.floor(Math.random() * (userNumbers.length));
            let randomUserNameIndex = Math.floor(Math.random() * (userNames.length));
            await Ref.add({
                contenturl: `https://randomuser.me/api/portraits/women/${randomUserNumber}.jpg`,
                likes: 0,
                name: userNames[randomUserNameIndex],
                shared: i,
                time: new Date(),
                userimage: `https://randomuser.me/api/portraits/women/${randomImageNumber}.jpg`
            })
            console.log(i);
        }
    }
}