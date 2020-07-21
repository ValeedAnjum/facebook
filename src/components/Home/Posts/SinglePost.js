import React, {useState, Fragment} from 'react'
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
        likes
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
                    {/* <img src="style/images/user.jpg" alt="user-img"/> */}
                    <img src={userimage} alt="user-img"/>
                </div>
                <div className="name-and-time">
                    <span>{name}</span>
                    <span>
                        5 hrs
                        <i className="fas fa-globe-asia"></i>
                    </span>
                </div>
                <div className="three-dots" onClick={() => setOptions(!options)}>
                    <div className="dot-1"></div>
                    <div className="dot-2"></div>
                    <div className="dot-3"></div>
                    {
                        options ? <SinglePostOptions />:null
                    }
                </div>
            </div>
            <div className="user-content">
                {/* <img src="style/images/user.jpg" alt="post-img"/> */}
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

export default SinglePost
