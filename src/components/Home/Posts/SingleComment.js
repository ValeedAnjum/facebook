import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import CommentsReplies from './CommentsReplies';

const SingleComment = ({comment, postId}) => {
    const [showReplies,
        setshowReplies] = useState(false);
    const {
        likes,
        message,
        name,
        profileimage,
        replies,
        id,
        time
    } = comment;
    const showRepliesHandler = () => {
        setshowReplies(true);
    }

    return (
        <div className="single-comment">
            <img src={profileimage} alt="comment"/>
            <div className="user-name-and-message-and-options">
                <div className="user-name-and-message">
                    <span>{name}</span>
                    <span>{message}</span>
                </div>
                <div className="like-reply-btn-and-time">
                    <span>
                        {
                        time ? moment(time.toDate()).fromNow():moment(new Date()).fromNow()
                        }
                    </span>
                </div>
                
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

SingleComment.propTypes = {
    comment:PropTypes.array, 
    postId:PropTypes.string
}

export default SingleComment
