const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
exports.onUserStatusChanged = functions
    .database
    .ref('/status/{uid}')
    .onUpdate(async(change, context) => {
        const eventStatus = change
            .after
            .val();
        const userStatusFirestoreRef = firestore.doc(`status/${context.params.uid}`);
        const statusSnapshot = await change
            .after
            .ref
            .once('value');
        const status = statusSnapshot.val();
        console.log(status, eventStatus);
        if (status.last_changed > eventStatus.last_changed) {
            return null;
        }
        eventStatus.last_changed = new Date(eventStatus.last_changed);
        return userStatusFirestoreRef.set(eventStatus);
    });


const createPostNotification = (Notification => {
    return admin
    .firestore()
    .collection('notification')
    .add(postNotification)
    .then(res => console.log('Post created notification added',res)).catch(err => err.message);
})
exports.postCreated = functions
    .firestore
    .document('Posts/{postId}')
    .onCreate(doc => {
        const post = doc.data();
        const postNotification = {
            notificationname: 'post-created-notification',
            name: `${post.name}`,
            message: 'has created a new post',
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }
        return createPostNotification(postNotification);
    })