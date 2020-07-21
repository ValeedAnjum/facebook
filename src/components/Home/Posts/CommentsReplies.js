import React, { Fragment, useEffect } from 'react'
import SingleComment from './SingleComment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { fetchCommentReplies } from '../../../store/Actions/PostActions';
const CommentsReplies = (props) => {
    const {commentId, postId, comments, fetchCommentReplies} = props;
    useEffect(() => {
        fetchCommentReplies(postId,commentId);
    },[])

    return (
        <Fragment>
            {
                comments && comments.length >= 1 && comments.map(comment => {
                    return <SingleComment commentreply key={comment.id} comment={comment} postId={postId} />
                })
            }
        </Fragment>
    )
}

const mapState = state => {
    return {
        comments:state.PostReducer.commentReplies
    }
}

const mapDispatch = dispatch => {
    return {
        fetchCommentReplies:(postId,commentId) => dispatch(fetchCommentReplies(postId,commentId))
    }
}
export default compose(
    connect(mapState,mapDispatch),
    firestoreConnect(props => {
        return props.postId && props.commentId && [{
            collection:'Posts',
            doc:props.postId,
            subcollections: [{
                collection: 'comments',
                where:[
                    'replyof','==',`${props.commentId}`
                ]
            }]
        }]
    })
)(CommentsReplies);
