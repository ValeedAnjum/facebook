import React from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../store/Actions/PostActions';
const CommentInput = ({postId, addComment, replyof}) => {

    const valueHanler = event => {
        const val = event.target.value.trim();
        if(event.which === 13 && val.length>=1) {
            addComment(postId,{message:val,replyof});
        }
    }
    return (
        <div className="comment-content">
            <input type="text" name="user-comment" onKeyPress={valueHanler} placeholder="Write a comment"/>
            <i className="far fa-surprise"></i>
        </div>
    )
}

const mapDispatch = dispatch => {
    return {
        addComment:(postId,data) => dispatch(addComment(postId,data))
    }
}

export default connect(null,mapDispatch)(CommentInput);
