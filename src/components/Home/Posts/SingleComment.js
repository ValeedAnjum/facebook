import React, {Fragment, useState} from 'react'
import CommentsReplies from './CommentsReplies';
import CommentInput from './CommentInput';

const SingleComment = ({comment, postId, commentreply, addCommentLocally}) => {
    const [showReplies,
        setshowReplies] = useState(false);
    const [postReplies,
        setPostReplies] = useState(false);
    const {
        likes,
        message,
        name,
        profileimage,
        replies,
        id
    } = comment;
    const showRepliesHandler = () => {
        setshowReplies(true);
    }
    const commentReplyHandler = () => {
        setPostReplies(!postReplies);
    }
    return (
        <div className="single-comment">
            {/* <img src="style/images/user.jpg" alt="comment"/> */}
            <img src={profileimage} alt="comment"/>
            <div className="user-name-and-message-and-options">
                <div className="user-name-and-message">
                    <span>{name}</span>
                    <span>{message}</span>
                </div>
                <div className="like-reply-btn-and-time">
                    <button>Like</button>
                    {/* {!commentreply
                        ? <button onClick={commentReplyHandler}>Reply</button>
                        : null
} */}
                    <span>29m</span>
                </div>
                {postReplies
                    ? <div className="post-comment">
                            <CommentInput postId={postId} replyof={id}  />
                        </div>
                    : null
}
            </div>
            {(replies >= 1 && !showReplies)
                ? <Fragment>
                        <div className="comment-replies" onClick={showRepliesHandler}>
                            <i className="fas fa-arrow-down"></i>
                            <h6>
                                {` ${replies} Replies `}
                            </h6>
                        </div>
                    </Fragment>
                : <Fragment>
                    {(replies >= 1)
                        ? <CommentsReplies commentId={id} postId={postId}/>
                        : null
}
                </Fragment>
}
        </div>
    )
}

export default SingleComment
