import React, { Fragment } from 'react'
import SingleComment from './SingleComment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { fetchCommentReplies } from '../../store/Actions/PostActions';
const CommentsReplies = ({ id , fetchCommentReplies }) => {
    return (
        <Fragment>
            <h1 onClick={() => fetchCommentReplies(id)}>Khan</h1>
        </Fragment>
    )
}

const mapState = state => {
    // console.log(state.firestore);
    return {

    }
}

const mapDispatch = dispatch => {
    return {
        fetchCommentReplies:commnetId => dispatch(fetchCommentReplies(commnetId))
    }
}
export default connect(mapState,mapDispatch)(CommentsReplies);
