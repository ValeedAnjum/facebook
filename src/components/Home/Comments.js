import React from 'react'

const Comments = () => {
    return (
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
    )
}

export default Comments
