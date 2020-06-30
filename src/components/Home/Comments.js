import React from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import SingleComment from './SingleComment';
const Comments = ({comments , postId}) => {
    
    return (
        <div className="comments">
            {
                comments && comments[0].comments.map(comment => {
                    return <SingleComment postId={postId} key={comment.id} comment={comment} />
                })
            }
        </div>
    )
}

const mapState = state => {
    // console.log(state.firestore.ordered.Posts);
    return {comments: state.firestore.ordered.Posts}
}
const mapDispatch = dispatch => {
    return {}
}
export default compose(connect(mapState, mapDispatch), firestoreConnect(props => {
    // console.log(props.postId);
    return props.postId && [
        {
            collection: 'Posts',
            doc:'dMDqQSpxsXZrI4qIHAM5',
            subcollections: [{ 
                collection: 'comments',
                where:[
                    'replyof','==','false'
                ]
            }]
        }
    ]
}))(Comments);
