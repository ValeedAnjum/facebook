import React from 'react'
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import SingleComment from './SingleComment';
import { fetchPostComments } from '../../store/Actions/PostActions';
const Comments = ({comments,fetchPostComments,postId}) => {
    
    return (
        <div className="comments" onClick={() => fetchPostComments(postId)}>
            <h1>Khan</h1>
            {
                comments && comments[0].comments.map(comment => {
                    return <SingleComment key={comment.id} comment={comment} />
                })
            }
        </div>
    )
}

const mapState = state => {
    // console.log(state.firestore.ordered.Posts);
    return {

    }
}
const mapDispatch = dispatch => {
    return {
        fetchPostComments:PostId => dispatch(fetchPostComments(PostId))
    }
}
export default compose(connect(mapState, mapDispatch))(Comments);
