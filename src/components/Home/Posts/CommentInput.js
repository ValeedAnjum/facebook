import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { addComment } from '../../../store/Actions/PostActions';
const CommentInput = ({postId, addComment, replyof, addCommentLocally}) => {
    const [savingComment, setsavingComment] = useState(false);
    const [value,setValue] = useState("");
    const valueHanler = async event => {
        const val = event.target.value.trim();
        if(event.which === 13 && val.length>=1) {
            try {
                setsavingComment(true);
                event.target.disabled = true;
                event.persist();
                const commentId =  await addComment(postId,{message:val,replyof});
                addCommentLocally && addCommentLocally(val,commentId);
                setValue("");
                setsavingComment(false);
                event.target.disabled = false;
            } catch (error) {
                console.log(error.message);
            }
        }
    }
    const valChangeHandler = event => {
        if(event.target.value.trim().length < 300){
           setValue(event.target.value);
        }
    }
    return (
        <div className="comment-content">
            <input type="text" name="user-comment" 
                style={{opacity:`${savingComment ? '0.5':'1'}`,
                pointerEvents:`${savingComment ? 'none':'auto'}`}} 
                onKeyPress={valueHanler} 
                value={value}
                onChange={valChangeHandler}
                placeholder="Write a comment"/>
            <i className="far fa-surprise"></i>
        </div>
    )
}

CommentInput.propTypes = {
    postId:PropTypes.string, 
    addComment:PropTypes.func, 
    replyof:PropTypes.string, 
    addCommentLocally:PropTypes.func,
}

const mapDispatch = dispatch => {
    return {
        addComment:(postId,data) => dispatch(addComment(postId,data))
    }
}

export default connect(null,mapDispatch)(CommentInput);
