
export const register = cred => {
    return  async (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const {fname,lname,email,password} = cred;
        try {
            const userData = await firebase.auth().createUserWithEmailAndPassword(email,password);
            await firestore.collection('users').doc(userData.user.uid).set({fname,lname,email});
            console.log('Account Created');
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const logIn = cred =>  {
    return async (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        const {email, password } = cred;
        try {
            const res = await firebase.auth().signInWithEmailAndPassword(email,password);
            console.log(res);
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const logOut = () => {
    return async (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signOut();
            console.log('Signout Successfully');
        } catch (err) {
            console.log(err.message);
        }
    }
}

export const uploadProfilePicture = file => {
    return (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        const id = firebase.auth().currentUser.uid;
        var storageRef = firebase.storage().ref(`profile-picture/${id}`);
        console.log('uploading');
        var uploadTask = storageRef.putString(file, 'data_url');
        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            uploadTask
                .snapshot
                .ref
                .getDownloadURL()
                .then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                });
        })
    }
}