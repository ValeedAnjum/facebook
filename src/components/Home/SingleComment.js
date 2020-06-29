import React, { Fragment } from 'react'

const SingleComment = ({comment}) => {
    const {likes, message, name, profileimage, replies} = comment;
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
                    <button>Reply</button>
                    <span>29m</span>
                </div>
            </div>
            {(replies >= 1)
                ? <Fragment>
                        <div className="comment-replies">
                            <i className="fas fa-arrow-down"></i>
                            <h6>
                                {replies} Replies</h6>
                        </div>
                    </Fragment>
                : null
            }

        </div>
    )
}

export default SingleComment
