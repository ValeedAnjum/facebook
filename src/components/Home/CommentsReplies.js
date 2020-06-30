import React, { Fragment, useState } from 'react'
import SingleComment from './SingleComment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { fetchCommentReplies } from '../../store/Actions/PostActions';
const CommentsReplies = (props) => {
    const { commentId, postId , fetchCommentReplies , replies} = props;
    const [comments, setComments] = useState(false);
    const fetchCommentRepliesL = async () => {
        await fetchCommentReplies(postId,commentId);
    }
    return (
        <Fragment>
            <h6 onClick={fetchCommentRepliesL}>No Replay</h6>
            {
                replies && !comments && replies.map(com => {
                    return <SingleComment key={com.id} comment={com} />
                })
            }
            {

            }
            {/* {
                comments &&  comments.map(com => {
                    return <SingleComment key={com.id} comment={com} />
                })
            } */}
            {
                comments ? <h1>True</h1>:<h1>false</h1>
            }
        </Fragment>
    )
}

const mapState = state => {
    return {
        replies:state.PostReducer.commentReplies
    }
}

const mapDispatch = dispatch => {
    return {
        fetchCommentReplies:(postId,commentId) => dispatch(fetchCommentReplies(postId,commentId))
    }
}
export default connect(mapState,mapDispatch)(CommentsReplies);
