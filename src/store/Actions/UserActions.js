
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

export const uploadProfilePicture = () => {
    return (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        var storageRef =  firebase.storage();
        console.log('Anjum'); 
        // const firebase = getFirebase();
        // var storageRef = firebase.storage().ref(new Date().toString());
        // console.log('uploading');
    }
}