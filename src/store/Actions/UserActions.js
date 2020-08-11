import firebase from "../../Configs/config";
import * as constants from "../Constants/Constants";
export const register = (cred) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const { fname, lname, email, password } = cred;
    if (fname.length > 15 || lname.length > 15) {
      alert("First Name and Last Name length must be 15 Characters or less");
      return;
    }
    dispatch({ type: constants.REGISTRATION_START });
    try {
      const userData = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await firestore
        .collection("users")
        .doc(userData.user.uid)
        .set({ fname, lname, email, photoUrl: "" });
      console.log("Account Created");
      dispatch({ type: constants.REGISTRATION_SUCCESS });
    } catch (err) {
      dispatch({ type: constants.REGISTRATION_ERROR, payload: err.message });
      alert(err.message);
    }
  };
};

export const logIn = (cred) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const { email, password } = cred;
    dispatch({ type: constants.LOGIN_START });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: constants.LOGIN_SUCCESS });
    } catch (err) {
      dispatch({ type: constants.LOGIN_ERROR, payload: err.message });
      //Will Create A Error Model Latter
      alert(err.message);
    }
  };
};

export const logOut = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    try {
      //set user status to offline
      const uid = firebase.auth().currentUser.uid;
      const userStatusDatabaseRef = firebase.database().ref("/status/" + uid);
      const isOfflineForDatabase = {
        state: "offline",
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };
      dispatch({ type: constants.LOGOUT_START });
      await userStatusDatabaseRef.set(isOfflineForDatabase);
      //set user status to offline
      await firebase.auth().signOut();
      dispatch({ type: constants.LOGOUT_SUCCESS });
    } catch (err) {
      dispatch({ type: constants.LOGOUT_ERROR, payload: err.message });
      //Will Create A Error Model Latter
      alert(err.message);
    }
  };
};
export const uploadProfilePicture = (file) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const id = firebase.auth().currentUser.uid;
    const storageRef = firebase.storage().ref(`profile-picture/${id}`);
    // console.log('uploading');
    dispatch({ type: constants.UPLOADING_START });
    const uploadTask = storageRef.putString(file, "data_url");
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      function (err) {
        // Handle unsuccessful uploads Will Create A Error Model Latter
        alert(err.message);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const Ref = firestore.collection("users").doc(id);
          return Ref.update({ photoUrl: downloadURL })
            .then((res) => {
              console.log(
                "Firestore profile data has been updated successfully"
              );
              dispatch({ type: constants.UPLOADING_END });
              dispatch({ type: constants.UPLOAD_PROFILE_PICTURE_MODEL_CLOSE });
            })
            .catch((err) => {
              //Will Create A Error Model Latter
              alert(err.message);
            });
        });
      }
    );
  };
};

//User Presence
export const setPresenceOffline = () => {
  return async (dispatch, getState) => {
    //set user status to offline
    const uid = firebase.auth().currentUser.uid;
    const userStatusDatabaseRef = firebase.database().ref("/status/" + uid);
    const isOfflineForDatabase = {
      state: "offline",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    try {
      await userStatusDatabaseRef.set(isOfflineForDatabase);
    } catch (err) {
      //Will Create A Error Model Latter
      alert(err.message);
    }
    //set user status to offline
  };
};

export const setPresenceOnline = () => {
  return async (dispatch, getState) => {
    //set user status to Online
    const uid = firebase.auth().currentUser.uid;
    const userStatusDatabaseRef = firebase.database().ref("/status/" + uid);
    const isOnlineForDatabase = {
      state: "online",
      last_changed: firebase.database.ServerValue.TIMESTAMP,
    };
    try {
      await userStatusDatabaseRef.set(isOnlineForDatabase);
    } catch (err) {
      //Will Create A Error Model Latter
      alert(err.message);
    }
    //set user status to Online
  };
};
//User Presence

export const getOnlineUser = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const userId = firebase.auth().currentUser.uid;
    const RefToStatus = firestore
      .collection("status")
      .orderBy("last_changed", "desc");
    const RefToUserData = firestore.collection("users");
    const query = RefToStatus.where("state", "==", "online");
    dispatch({ type: constants.FTECH_ONLINE_USERS_START });
    try {
      const querySnap = await query.get();
      if (querySnap.docs.length === 0) {
        return querySnap;
      }
      const onlineUsersIds = [];
      for (let i = 0; i < querySnap.docs.length; i++) {
        onlineUsersIds.push({
          ...querySnap.docs[i].data(),
          id: querySnap.docs[i].id,
        });
      }
      const onlineUsersWithCurrentUser = [];
      for (let i = 0; i < onlineUsersIds.length; i++) {
        let query = RefToUserData.doc(onlineUsersIds[i].id);
        let querySnap = await query.get();
        onlineUsersWithCurrentUser.push({
          ...querySnap.data(),
          id: onlineUsersIds[i].id,
        });
      }
      const onlineUsers = onlineUsersWithCurrentUser.filter((user) => {
        return user.id != userId;
      });
      dispatch({
        type: constants.FTECH_ONLINE_USERS_SUCCESS,
        payload: onlineUsers,
      });
    } catch (err) {
      //Will Create A Error Model Latter
      alert(err.message);
    }
  };
};
