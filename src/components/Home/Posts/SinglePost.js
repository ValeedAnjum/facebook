import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import Comments from './Comments';
import SinglePostOptions from './SinglePostOptions';

const SinglePost = ({post, likePost, unlikePost}) => {
    const {
        picture,
        video,
        name,
        userimage,
        userstory,
        isLiked,
        id,
        likes,
        time
    } = post;
    const [localIsLiked,
        setlocalIsLiked] = useState(isLiked);
    const [displayComments, setdisplayComments] = useState(false);
    const [options, setOptions] = useState(false);
    const likeHandler = isLiked => {
        setlocalIsLiked(true);
        likePost(post);
    }
    const displayCommentsHandler = () => {
        setdisplayComments(true);
    }
    const unLikeHandler = isLiked => {
        setlocalIsLiked(false);
        unlikePost(post);
    }
    return (
        <div className="post">
            <div className="user-data">
                <div className="user-image">
                    <img src={userimage} alt="user-img"/>
                </div>
                <div className="name-and-time">
                    <span>{name}</span>
                    <span>
                        {moment(time.toDate()).fromNow()}
                    </span>
                </div>
                <div className="three-dots" onClick={() => setOptions(!options)}>
                    <div className="dot-1"></div>
                    <div className="dot-2"></div>
                    <div className="dot-3"></div>
                    {
                        options ? <SinglePostOptions name={name} />:null
                    }
                </div>
            </div>
            <div className="user-content">
                {userstory
                    ? userstory
                    : null
}
                {picture
                    ? <img src={picture} alt="post-img"/>
                    : null
}
                {video
                    ? <video src={video} controls/>
                    : null
}
            </div>
            <div className="post-buttons">
                <div className="button-container">
                    {(localIsLiked)
                        ? <Fragment>
                                <button
                                    className={`${isLiked
                                    ? 'is-liked'
                                    : null} like ${localIsLiked
                                        ? 'is-liked'
                                        : null}`}
                                    onClick={unLikeHandler}>
                                    Unlike
                                </button>
                            </Fragment>
                        : <Fragment>
                            <button
                                className={`like`}
                                onClick={likeHandler}>
                                like
                            </button>
                        </Fragment>
}
                    <button className={`${displayComments ? "is-liked":null} comment`} onClick={displayCommentsHandler}>Comment</button>
                    <button className="share">Share</button>
                </div>
            </div>
            {
                displayComments ? <Comments postId={id} />:null
            }
        </div>
    )
}

SinglePost.propTypes = {
    post:PropTypes.array, 
    likePost:PropTypes.func, 
    unlikePost:PropTypes.func
}

export default SinglePost
