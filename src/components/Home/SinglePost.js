import React from 'react'

const SinglePost = ({ post, likePost}) => {
    const { picture, video, name, userimage , userstory } = post;
    // const { contenturl, id, likes, name, shared, time, userimage } = post;
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
                <div className="three-dots">
                    <div className="dot-1"></div>
                    <div className="dot-2"></div>
                    <div className="dot-3"></div>
                    <div className="options-container">
                        <div className="option">
                            <div className="option-icon">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                            <div className="option-name-and-description">
                                <div className="name">Save Post</div>
                                <div className="description">Add this post to your saved items</div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-icon">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                            <div className="option-name-and-description">
                                <div className="name">Turn on notification for this post</div>
                                <div className="description">Turn on notification</div>

                            </div>
                        </div>
                        <div className="option">
                            <div className="option-icon">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                            <div className="option-name-and-description">
                                <div className="name">Embed</div>
                                <div className="description">Embed</div>

                            </div>
                        </div>
                        <div className="option">
                            <div className="option-icon">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                            <div className="option-name-and-description">
                                <div className="name">Snooze Fabiha for 30 days</div>
                                <div className="description">temporarily stop seeing posts</div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-icon">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                            <div className="option-name-and-description">
                                <div className="name">Unfollow Fabiha</div>
                                <div className="description">Stop seeing posts but stay friends</div>
                            </div>
                        </div>
                        <div className="option">
                            <div className="option-icon">
                                <i className="fas fa-sync-alt"></i>
                            </div>
                            <div className="option-name-and-description">
                                <div className="name">Find support or report post</div>
                                <div className="description">I'm concerned about this post</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-content">
                {/* <img src="style/images/user.jpg" alt="post-img"/> */}
                {
                    userstory ? userstory:null
                }
                {
                    picture ? <img src={picture} alt="post-img"/>:null
                }
                {
                    video ? <video src={video} controls />:null
                }
            </div>
            <div className="post-buttons">
                <div className="button-container">
                    <button className="like" onClick={() => likePost(post)}>Like</button>
                    <button className="comment">Comment</button>
                    <button className="share">Share</button>
                </div>
            </div>
            <div className="comments">
                <div className="single-comment">
                    <img src="style/images/user.jpg" alt="comment"/>
                    <div className="user-name-and-message-and-options">
                        <div className="user-name-and-message">
                            <span>Valeed Anjum</span>
                            <span>Mashallah</span>
                        </div>
                        <div className="like-reply-btn-and-time">
                            <button>Like</button>
                            <button>Reply</button>
                            <span>29m</span>
                        </div>
                    </div>
                    <div className="single-comment">
                        <img src="style/images/user.jpg" alt="comment"/>
                        <div className="user-name-and-message-and-options">
                            <div className="user-name-and-message">
                                <span>Valeed Anjum</span>
                                <span>Mashallah</span>
                            </div>
                            <div className="like-reply-btn-and-time">
                                <button >Like</button>
                                <button>Reply</button>
                                <span>29m</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-comment">
                <img src="style/images/user.jpg" alt="user-img"/>
                <div className="comment-content">
                    <input type="text" name="user-comment" placeholder="Write a comment"/>
                    <i className="far fa-surprise"></i>
                    <i className="far fa-surprise"></i>
                    <i className="far fa-surprise"></i>
                    <i className="far fa-surprise"></i>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
