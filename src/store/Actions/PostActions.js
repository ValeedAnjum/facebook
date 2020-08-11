import firebase from "../../Configs/config";
import { v4 as uuidv4 } from "uuid";
export const fetchPost = (lastPostId) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firestore = firebase.firestore();
    const Ref = firestore.collection("Posts");
    const id = firebase.auth().currentUser.uid;
    dispatch({ type: "FETCH_POST_START", payload: [] });
    try {
      const lastItem =
        lastPostId &&
        (await firestore.collection("Posts").doc(lastPostId).get());
      let query;
      lastItem
        ? (query = Ref.orderBy("time", "desc").startAfter(lastItem).limit(3))
        : (query = Ref.orderBy("time", "desc").limit(3));
      let querySnap = await query.get();
      if (querySnap.docs.length === 0) {
        return querySnap;
      }
      let post = [];
      for (let i = 0; i < querySnap.docs.length; i++) {
        let isLiked = await Ref.doc(querySnap.docs[i].id)
          .collection("likes")
          .where("userid", "==", id)
          .get();
        if (isLiked.docs.length >= 1) {
          if (isLiked.docs[0].data().userid === id) {
            isLiked = true;
          }
        } else {
          isLiked = false;
        }
        post.push({
          ...querySnap.docs[i].data(),
          id: querySnap.docs[i].id,
          isLiked,
        });
      }

      dispatch({ type: "FETCH_POST_SUCCESS", payload: post });
      // console.log(getState().PostReducer.post);
      return querySnap;
    } catch (err) {
      dispatch({ type: "FETCH_POST_ERROR", payload: err.message });
      //Will Create A Error Model Latter
      alert(err.message);
    }
  };
};

export const addPost = (file, userStory) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // console.log(uuidv4());
    const isImage = file && file.indexOf("image") > 1;
    const firebase = getFirebase();
    const firestore = getFirestore();
    const id = firebase.auth().currentUser.uid;
    const { fname, photoUrl } = getState().firebase.profile;
    dispatch({ type: "UPLOADING_START" });
    if (!file && userStory) {
      const Ref = firestore.collection("Posts");
      if (userStory.length > 0) {
        return Ref.add({
          likes: 0,
          name: fname,
          shared: "asdas",
          time: new Date(),
          userimage: photoUrl,
          userstory: userStory,
          userid: id,
        })
          .then(() => {
            console.log("Post Added Successfully");
            dispatch({ type: "UPLOADING_END" });
            dispatch({ type: "UPLOADING_PROGRESS", payload: null });
          })
          .catch((err) => {
            //Will Create A Error Model Latter
            alert(err.message);
          });
      }
      return;
    }
    var storageRef = isImage
      ? firebase.storage().ref(`post-pictures/${uuidv4()}`)
      : firebase.storage().ref(`post-videos/${uuidv4()}`);
    var uploadTask = storageRef.putString(file, "data_url");
    uploadTask.on(
      "state_changed",
      function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        dispatch({ type: "UPLOADING_PROGRESS", payload: progress });
      },
      function (error) {
        console.log(error);
      },
      function () {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          const Ref = firestore.collection("Posts");
          console.log(downloadURL);
          if (userStory.length > 0 && isImage) {
            return Ref.add({
              picture: downloadURL,
              likes: 0,
              name: fname,
              shared: "asdas",
              time: new Date(),
              userimage: photoUrl,
              userstory: userStory,
              userid: id,
            })
              .then(() => {
                console.log("Post Added Successfully");
                dispatch({ type: "UPLOADING_END" });
                dispatch({ type: "UPLOADING_PROGRESS", payload: null });
              })
              .catch((err) => {
                //Will Create A Error Model Latter
                alert(err.message);
              });
          } else if (userStory.length > 0 && !isImage) {
            return Ref.add({
              video: downloadURL,
              likes: 0,
              name: fname,
              shared: "asdas",
              time: new Date(),
              userimage: photoUrl,
              userstory: userStory,
              userid: id,
            })
              .then(() => {
                dispatch({ type: "UPLOADING_END" });
              })
              .catch((err) => {
                //Will Create A Error Model Latter
                alert(err.message);
              });
          } else if (isImage) {
            return Ref.add({
              picture: downloadURL,
              likes: 0,
              name: fname,
              shared: "asdas",
              time: new Date(),
              userimage: photoUrl,
              userid: id,
            })
              .then(() => {
                console.log("Post Added Successfully");
                dispatch({ type: "UPLOADING_END" });
              })
              .catch((err) => {
                //Will Create A Error Model Latter
                alert(err.message);
              });
          } else if (!isImage) {
            return Ref.add({
              video: downloadURL,
              likes: 0,
              name: fname,
              shared: "asdas",
              time: new Date(),
              userimage: photoUrl,
              userid: id,
            })
              .then(() => {
                dispatch({ type: "UPLOADING_END" });
              })
              .catch((err) => {
                //Will Create A Error Model Latter
                alert(err.message);
              });
          } else if (userStory.length > 0) {
            return Ref.add({
              likes: 0,
              name: fname,
              shared: "asdas",
              time: new Date(),
              userimage: photoUrl,
              userstory: userStory,
              userid: id,
            })
              .then(() => {
                dispatch({ type: "UPLOADING_END" });
              })
              .catch((err) => {
                //Will Create A Error Model Latter
                alert(err.message);
              });
          }
        });
      }
    );
  };
};

export const likePost = (post) => {
  return async () => {
    const firestore = firebase.firestore();
    const Ref = firestore.collection("Posts");
    const increment = firebase.firestore.FieldValue.increment(1);
    const userid = firebase.auth().currentUser.uid;
    const { id } = post;
    await Ref.doc(id).update({ likes: increment });
    await Ref.doc(id)
      .collection("likes")
      .doc(`${userid}_${id}`)
      .set({ userid: userid, postid: id });
    console.log("liked post");
  };
};

export const unlikePost = (post) => {
  return async () => {
    const firestore = firebase.firestore();
    const Ref = firestore.collection("Posts");
    const increment = firebase.firestore.FieldValue.increment(-1);
    const userid = firebase.auth().currentUser.uid;
    const { likes, id } = post;
    console.log("Unlike Post");
    try {
      if (likes > 0) {
        await Ref.doc(id).update({ likes: increment });
        await Ref.doc(id).collection("likes").doc(`${userid}_${id}`).delete();
      }
      console.log("unliked post");
    } catch (err) {
      //Will Create A Error Model Latter
      alert(err.message);
    }
  };
};

export const fetchPostComments = (postId) => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();
    const Ref = firestore
      .collection("Posts")
      .doc(postId)
      .collection("comments")
      .orderBy("time");
    const query = Ref.where("replyof", "==", "false");
    dispatch({ type: "FETCH_POST_COMMENTS_START" });
    try {
      const querySnap = await query.get();
      const comments = [];
      for (let i = 0; i < querySnap.docs.length; i++) {
        comments.push({
          ...querySnap.docs[i].data(),
          id: querySnap.docs[i].id,
        });
      }
      dispatch({ type: "FETCH_POST_COMMENTS_SUCCESS", payload: comments });
      return querySnap;
    } catch (err) {
      dispatch({ type: "FETCH_POST_COMMENTS_ERROR", payload: err.message });
      //Will Create A Error Model Latter
      alert(err.message);
    }
  };
};

export const fetchCommentReplies = (postId, commentId) => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();
    const Ref = firestore
      .collection("Posts")
      .doc(postId)
      .collection("comments")
      .orderBy("time");
    const query = Ref.where("replyof", "==", `${commentId}`);
    dispatch({ type: "FETCH_POST_COMMENTS_REPLIES_START" });
    try {
      const querySnap = await query.get();
      const comments = [];
      for (let i = 0; i < querySnap.docs.length; i++) {
        comments.push({
          ...querySnap.docs[i].data(),
          id: querySnap.docs[i].id,
        });
      }
      dispatch({
        type: "FETCH_POST_COMMENTS_REPLIES_SUCCESS",
        payload: comments,
      });
      return querySnap;
    } catch (err) {
      dispatch({
        type: "FETCH_POST_COMMENTS_REPLIES_ERROR",
        payload: err.message,
      });
      //Will Create A Error Model Latter
      alert(err.message);
    }
  };
};

export const addComment = (postId, data) => {
  return async (dispatch, getState) => {
    const firestore = firebase.firestore();
    const Ref = firestore
      .collection("Posts")
      .doc(postId)
      .collection("comments");
    const increment = firebase.firestore.FieldValue.increment(1);
    const { message, replyof } = data;
    const { photoUrl, fname, lname } = getState().firebase.profile;
    const replyoff = replyof ? replyof : "false";
    try {
      if (replyof) {
        await firestore
          .collection("Posts")
          .doc(postId)
          .collection("comments")
          .doc(replyoff)
          .update({ replies: increment });
      }
      const res = await Ref.add({
        likes: [],
        message: message,
        name: `${fname} ${lname}`,
        profileimage: photoUrl,
        replies: 0,
        replyof: replyoff,
        time: new Date(),
      });
      return res.id;
    } catch (err) {
      //Will Create A Error Model Latter
      alert(err.message);
    }
  };
};
export const addPostDumyData = () => {
  return async (dispatch, getState, { getFirebase }) => {
    const firestore = firebase.firestore();
    const firebaseL = getFirebase();
    const id = firebaseL.auth().currentUser.uid;
    const Ref = firestore.collection("Posts");
    const userNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const userNames = [
      "Valeed",
      "Anjum",
      "Siddiqui",
      "Ali",
      "Hamza",
      "Abid",
      "Alisha",
    ];
    for (let i = 0; i < 10; i++) {
      let randomUserNumber = Math.floor(Math.random() * userNumbers.length);
      let randomImageNumber = Math.floor(Math.random() * userNumbers.length);
      let randomUserNameIndex = Math.floor(Math.random() * userNames.length);
      await Ref.add({
        picture: `https://randomuser.me/api/portraits/women/${randomUserNumber}.jpg`,
        likes: 0,
        name: userNames[randomUserNameIndex],
        shared: i,
        time: new Date(),
        userimage: `https://randomuser.me/api/portraits/women/${randomImageNumber}.jpg`,
        userid: id,
      });
      console.log(i);
    }
  };
};
