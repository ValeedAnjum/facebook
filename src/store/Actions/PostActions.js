import firebase from '../../config/config';

export const fetchPost = lastPostId => {
    return async(dispatch, getState,{getFirebase}) => {
        const firestore = firebase.firestore();
        const Ref = firestore.collection('Posts');
        try {
            const lastItem = lastPostId && (await firestore.collection('Posts').doc(lastPostId).get());
            let query;
            lastItem
                ? (query = Ref.orderBy('time','desc').startAfter(lastItem).limit(3))
                : (query = Ref.orderBy('time','desc').limit(3));
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

export const addPost = (file, userStory) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const isImage = file && file.indexOf('image') > 1;
        const firebase = getFirebase();
        const firestore = getFirestore();
        const id = firebase
            .auth()
            .currentUser
            .uid;
        const {fname, photoUrl} = getState().firebase.profile;
        console.log('addPost');
        dispatch({type: 'UploadingStart'});
        if (!file && userStory) {
            const Ref = firestore.collection('Posts');
            if (userStory.length > 0) {
                return Ref.add({
                    likes: 0,
                    name: fname,
                    shared: 'asdas',
                    time: new Date(),
                    userimage: photoUrl,
                    userstory: userStory,
                    userid: id
                }).then(() => {
                    console.log('Post Added Successfully');
                    dispatch({type: 'UploadingEnd'});
                    dispatch({type: 'UploadingProgress', payload: null});
                }).catch(err => {
                    console.log('err', err.message);
                })
            }
            return;
        }
        var storageRef = isImage
            ? firebase
                .storage()
                .ref(`post-pictures/${id}`)
            : firebase
                .storage()
                .ref(`post-videos/${id}`);
        var uploadTask = storageRef.putString(file, 'data_url');
        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            dispatch({type: 'UploadingProgress', payload: progress});
        }, function (error) {
            console.log(error);
        }, function () {
            uploadTask
                .snapshot
                .ref
                .getDownloadURL()
                .then(function (downloadURL) {
                    const Ref = firestore.collection('Posts');
                    console.log(downloadURL);
                    if (userStory.length > 0 && isImage) {
                        return Ref.add({
                            picture: downloadURL,
                            likes: 0,
                            name: fname,
                            shared: 'asdas',
                            time: new Date(),
                            userimage: photoUrl,
                            userstory: userStory,
                            userid: id
                        }).then(() => {
                            console.log('Post Added Successfully');
                            dispatch({type: 'UploadingEnd'});
                            dispatch({type: 'UploadingProgress', payload: null});
                        }).catch(err => {
                            console.log('err', err.message);
                        })
                    } else if (userStory.length > 0 && !isImage) {
                        return Ref.add({
                            video: downloadURL,
                            likes: 0,
                            name: fname,
                            shared: 'asdas',
                            time: new Date(),
                            userimage: photoUrl,
                            userstory: userStory,
                            userid: id
                        }).then(() => {
                            console.log('Post Added Successfully');
                            dispatch({type: 'UploadingEnd'});
                        }).catch(err => {
                            console.log('err', err.message);
                        })
                    } else if (isImage) {
                        return Ref.add({
                            picture: downloadURL,
                            likes: 0,
                            name: fname,
                            shared: 'asdas',
                            time: new Date(),
                            userimage: photoUrl,
                            userid: id
                        }).then(() => {
                            console.log('Post Added Successfully');
                            dispatch({type: 'UploadingEnd'});
                        }).catch(err => {
                            console.log('err', err.message);
                        })
                    } else if (!isImage) {
                        return Ref.add({
                            video: downloadURL,
                            likes: 0,
                            name: fname,
                            shared: 'asdas',
                            time: new Date(),
                            userimage: photoUrl,
                            userid: id
                        }).then(() => {
                            console.log('Post Added Successfully');
                            dispatch({type: 'UploadingEnd'});
                        }).catch(err => {
                            console.log('err', err.message);
                        })
                    } else if (userStory.length > 0) {
                        return Ref.add({
                            likes: 0,
                            name: fname,
                            shared: 'asdas',
                            time: new Date(),
                            userimage: photoUrl,
                            userstory: userStory,
                            userid: id
                        }).then(() => {
                            console.log('Post Added Successfully');
                            dispatch({type: 'UploadingEnd'});
                        }).catch(err => {
                            console.log('err', err.message);
                        })
                    }

                });
        })
    }
}

export const likePost = post => {
    return async (dispatch, getState , {getFirebase , getFirestore}) => {
        const firestore = firebase.firestore();
        const Ref = firestore.collection('Posts');
        const increment = firebase.firestore.FieldValue.increment(1);
        // const decrement = firebase.firestore.FieldValue.increment(-1);
        const { likes , id} = post;
        await Ref.doc(id).update({
            likes:increment
        })
        console.log('Updated');
    }
}

export const addPostDumyData = () => {
    return async(dispatch, getState , {getFirebase}) => {
        const firestore = firebase.firestore();
        const firebaseL = getFirebase();
        const id = firebaseL.auth().currentUser.uid;
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
                picture: `https://randomuser.me/api/portraits/women/${randomUserNumber}.jpg`,
                likes: 0,
                name: userNames[randomUserNameIndex],
                shared: i,
                time: new Date(),
                userimage: `https://randomuser.me/api/portraits/women/${randomImageNumber}.jpg`,
                userid:id
            })
            console.log(i);
        }
    }
}