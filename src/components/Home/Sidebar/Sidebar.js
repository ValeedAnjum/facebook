import React from 'react'
import PictureLoadingPlaceholder from '../../Navbar/PictureLoadingPlaceholder';

const Sidebar = ({photoUrl}) => {
    return (
        <div className="user-navbar">
            <div className="user-itself">
                {
                    photoUrl ? <img src={photoUrl} alt="user-img"/>:<PictureLoadingPlaceholder />
                }
                <p>Valeed Anjum</p>
            </div>
            <div className="others">
                <div className="news-feeds user-tab">
                    <i className="fas fa-rss"></i>
                    News Feeds
                    <div className="dots dot-1"></div>
                    <div className="dots dot-2"></div>
                    <div className="dots dot-3"></div>
                </div>
                <div className="messenger active user-tab">
                    <i className="fab fa-facebook-messenger"></i>
                    Messenger
                    <div className="dots dot-1"></div>
                    <div className="dots dot-2"></div>
                    <div className="dots dot-3"></div>
                </div>
                <div className="watch user-tab">
                    <i className="fab fa-youtube"></i>
                    Watch
                    <div className="dots dot-1"></div>
                    <div className="dots dot-2"></div>
                    <div className="dots dot-3"></div>
                </div>
                <div className="shortcuts">
                    Shortcuts
                </div>
                <div className="shortcut">
                    <i className="fas fa-search-dollar"></i>
                    Freelancing Funda
                </div>
                <div className="shortcut">
                    <i className="fab fa-github"></i>
                    GitHub
                </div>
                <div className="shortcut">
                    <i className="fab fa-stack-overflow"></i>
                    Stackoverflow
                </div>
            </div>
        </div>
    )
}

export default Sidebar;
