import React from 'react'

const UserPosts = () => {
    const lazyLoader = () => {
        const scroolIsAtBottom = (document.documentElement.scrollHeight-window.innerHeight) === window.scrollY;
        console.log(scroolIsAtBottom);
    }
    window.addEventListener('scroll',lazyLoader);
    return (
        <div className="user-posts">
            <h4 className="not-fully-responsive">This is not responsive version</h4>
            <div className="create-post">
                <h4>Create Post</h4>
                <div className="user-image-and-content">
                    <img src="style/images/user.jpg" alt="user-img"/>
                    <input type="text" placeholder="What's on your mind, Valeed?"/>
                </div>
                <div className="upload-content">
                    <div className="upload-picture">
                        <input
                            type="file"
                            style={{
                            display: 'none'
                        }}
                            id="image"/>
                        <button
                            onClick={() => {
                            document
                                .getElementById('image')
                                .click()
                        }}>Photo</button>
                    </div>
                    <div className="upload-video">
                        <input
                            type="file"
                            style={{
                            display: 'none'
                        }}
                            id="image"/>
                        <button onclick="document.getElementById('image').click()">Video</button>
                    </div>
                </div>
                <div className="post-button-container">
                    <button>Post</button>
                </div>
            </div>
            <div className="posts-container">
                <div className="post">
                    <div className="user-data">
                        <div className="user-image">
                            <img src="style/images/user.jpg" alt="user-img"/>
                        </div>
                        <div className="name-and-time">
                            <span>Valeed Anjum</span>
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
                        <img src="style/images/user.jpg" alt="post-img"/>
                    </div>
                    <div className="post-buttons">
                        <div className="button-container">
                            <button className="like">Like</button>
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
                                        <button>Like</button>
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
            </div>
        </div>
    )
}

export default UserPosts
