export const register = cred => {
    return async(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const {fname, lname, email, password} = cred;
        try {
            const userData = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            await firestore
                .collection('users')
                .doc(userData.user.uid)
                .set({fname, lname, email});
            console.log('Account Created');
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const logIn = cred => {
    return async(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const {email, password} = cred;
        try {
            const res = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const logOut = () => {
    return async(dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        try {
            await firebase
                .auth()
                .signOut();
            console.log('Signout Successfully');
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const uploadProfilePicture = file => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const id = firebase
            .auth()
            .currentUser
            .uid;
        var storageRef = firebase
            .storage()
            .ref(`profile-picture/${id}`);
        // console.log('uploading');
        dispatch({type: 'UploadingStart'});
        var uploadTask = storageRef.putString(file, 'data_url');
        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, function (error) {
            // Handle unsuccessful uploads
            console.log(error);
        }, function () {
            uploadTask
                .snapshot
                .ref
                .getDownloadURL()
                .then(function (downloadURL) {
                    const Ref = firestore
                        .collection('users')
                        .doc(id);
                    return Ref
                        .update({photoUrl: downloadURL})
                        .then(res => {
                            console.log('Firestore profile data has been updated successfully');
                            dispatch({type: 'UploadingEnd'});
                            dispatch({type: 'CloseUploadProfilePicture'});
                        })
                        .catch(err => {
                            console.log(err.message);
                        })
                });
        })
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