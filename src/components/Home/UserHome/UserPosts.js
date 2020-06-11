import React , { Fragment , useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import SinglePost from './SinglePost';
import LaodingPosts from './LaodingPosts';

const UserPosts = () => {
    const [posts, setposts] = useState([]);
    const lazyLoader = () => {
        const scroolIsAtBottom = (document.documentElement.scrollHeight - window.innerHeight) === window.scrollY;
        if(scroolIsAtBottom){
            //Do what Ever You want
        }
    }
    
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
                        <button
                            onClick={() => {
                            document
                                .getElementById('image')
                                .click()
                        }}>Video</button>
                    </div>
                </div>
                <div className="post-button-container">
                    <button>Post</button>
                </div>
            </div>
            <div className="posts-container">
                {posts
                    ? <Fragment>
                        <SinglePost/>
                        <LaodingPosts />
                    </Fragment>
                    : <LaodingPosts />
                }
            </div>
        </div>
    )
}

const mapState = state => {
    console.log(state);
    return {
        
    }
}
const mapDispatch = dispatch => {
    return {}
}

export default compose(connect(mapState,mapDispatch))(UserPosts);
