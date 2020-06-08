const intState  = {

}


export const register = cred => {
    return (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const {fname,lname,email,password} = cred;
        console.log(cred);
        firebase.auth().createUserWithEmailAndPassword(email,password).then(res => {
            return firestore.collection('users').doc(res.user.uid).set({
                fname,
                lname,
                email
            }).then(() => {
                console.log('Account created');
            }).catch(err => {
                console.log(err.message);
            })
        }).catch(err => {
            console.log(err.message);
        })
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
        // firebase.auth().signInWithEmailAndPassword(email,password).then(res => {
        //     console.log('Login Successs');
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err.message);
        // })
    }
}

export const logOut = () => {
    return (dispatch,getState,{getFirebase,getFirestore}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            console.log('Signout')
        }).catch(err => {
            console.log(err.message);
        })
    }
}