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

const createNotification = (Notification => {
    return admin
        .firestore()
        .collection('notification')
        .add(Notification)
        .then(res => console.log('Post created notification added', res))
        .catch(err => err.message);
})
exports.postCreated = functions
    .firestore
    .document('Posts/{postId}')
    .onCreate(doc => {
        const post = doc.data();
        const postNotification = {
            notificationname: 'post-created-notification',
            name: `${post.name}`,
            message: 'created a new post',
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }
        return createNotification(postNotification);
    })

exports.accountCreated = functions
    .firestore
    .document('users/{userId}')
    .onCreate(doc => {
        const user = doc.data();
        const accountNotification = {
            notificationname: 'account-created-notification',
            name: `${user.fname} ${user.lname}`,
            message: 'created a new account',
            time: admin
                .firestore
                .FieldValue
                .serverTimestamp()
        }
        return createNotification(accountNotification);
    })