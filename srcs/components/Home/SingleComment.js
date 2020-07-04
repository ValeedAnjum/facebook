import React, { Fragment, useState } from 'react'
import CommentsReplies from './CommentsReplies';
import CommentInput from './CommentInput';

const SingleComment = ({comment,postId,commentreply}) => {
    const {likes, message, name, profileimage, replies , id} = comment;    
    return (
        <div className="single-comment">
            <img src="style/images/user.jpg" alt="comment"/>
            <div className="user-name-and-message-and-options">
                <div className="user-name-and-message">
                    <span>{name}</span>
                    <span>{message}</span>
                </div>
                <div className="like-reply-btn-and-time">
                    <button>Like</button>
                    {
                        !commentreply ? <button>Reply</button>:null
                    }
                    <span>29m</span>
                </div>
            </div>
        </div>
    )
}

export default SingleComment
