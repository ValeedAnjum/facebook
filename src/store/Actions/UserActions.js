import firebase from '../../config/config';
import { getFirebase } from 'react-redux-firebase';
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
                .set({fname, lname, email, photoUrl: ''});
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
            await firebase
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
            //set user status to offline
            const uid = firebase
                .auth()
                .currentUser
                .uid;
            const userStatusDatabaseRef = firebase
                .database()
                .ref('/status/' + uid);
            const isOfflineForDatabase = {
                state: 'offline',
                last_changed: firebase.database.ServerValue.TIMESTAMP
            };
            try {
                await userStatusDatabaseRef.set(isOfflineForDatabase);
            } catch (error) {
                console.log(error.message);
            }
            //set user status to offline
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

//User Presence
export const setPresenceOffline = () => {
    return async(dispatch, getState) => {
        //set user status to offline
        const uid = firebase
            .auth()
            .currentUser
            .uid;
        const userStatusDatabaseRef = firebase
            .database()
            .ref('/status/' + uid);
        const isOfflineForDatabase = {
            state: 'offline',
            last_changed: firebase.database.ServerValue.TIMESTAMP
        };
        try {
            await userStatusDatabaseRef.set(isOfflineForDatabase);
        } catch (error) {
            console.log(error.message);
        }
        //set user status to offline
    }
}

export const setPresenceOnline = () => {
    return async(dispatch, getState) => {
        //set user status to Online
        const uid = firebase
            .auth()
            .currentUser
            .uid;
        const userStatusDatabaseRef = firebase
            .database()
            .ref('/status/' + uid);
        const isOnlineForDatabase = {
            state: 'online',
            last_changed: firebase.database.ServerValue.TIMESTAMP
        };
        try {
            await userStatusDatabaseRef.set(isOnlineForDatabase);
        } catch (error) {
            console.log(error.message);
        }
        //set user status to Online
    }
}
//User Presence

export const getOnlineUser = () => {
    return async ( dispatch , getState, {getFirebase,getFirestore}) => {
        const firestore = getFirestore();
        const RefToStatus = firestore.collection('status').orderBy('last_changed','desc');
        const RefToUserData = firestore.collection('users');
        const query = RefToStatus.where('state','==','online');
        dispatch({type:'FTECH_ONLINE_USERS_START'});
        const querySnap = await query.get();
        if (querySnap.docs.length === 0) {
            return querySnap;
        }
        let onlineUsersIds = [];
        for(let i = 0 ; i < querySnap.docs.length ; i++) {
            onlineUsersIds.push({...querySnap.docs[i].data(),id:querySnap.docs[i].id});
        }
        let onlineUsers = [];
        for(let i = 0; i< onlineUsersIds.length;i++){
            let query = RefToUserData.doc(onlineUsersIds[i].id);
            let querySnap = await query.get();
            onlineUsers.push({...querySnap.data(),id:onlineUsersIds[i].id})
        }
        dispatch({type:'FTECH_ONLINE_USERS_SUCCESS',payload:onlineUsers});
    }
}