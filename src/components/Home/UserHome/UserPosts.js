import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import SinglePost from './SinglePost';
import LaodingPosts from './LaodingPosts';
import {fetchPost} from '../../../store/Actions/PostActions';
import { logOut } from '../../../store/Actions/UserActions';

class UserPosts extends Component {
    state = {
        loadedPosts: [],
        morePosts: true,
        loading: true
    }
    async componentDidMount() {
        const next = await this
            .props
            .fetchPost();
        if (next && next.docs && next.docs.length >= 1) {
            this.setState({loadedPosts: this.props.post, morePosts: true})
        }
    }
    lazyLoader = async() => {
        // console.log('ScroolHeight',document.documentElement.scrollHeight);
        // console.log('InnerHight',window.innerHeight);
        // console.log('ScroolY',window.scrollY);
        // console.log(document.documentElement.scrollHeight - window.innerHeight-1200);
        // console.log(window.scrollY);
        const scroolIsAtBottom = (document.documentElement.scrollHeight - window.innerHeight-1200) <= window.scrollY;
        if (scroolIsAtBottom && this.state.loading && this.state.morePosts) {
            this.setState({loading: false});
            await this.loadNextPost();
            this.setState({loading: true});
        }
    }
    loadNextPost = async() => {
        const {post} = this.props;
        const lastPostId = post && post[post.length - 1].id;
        // console.log("nextpost");
        const next = await this
            .props
            .fetchPost(lastPostId);
        if (next && next.docs && next.docs.length >= 1) {
            this.setState({
                loadedPosts: [
                    ...this.state.loadedPosts,
                    ...this.props.post
                ]
            });
        }
        if (next && next.docs && next.docs.length === 0) {
            this.setState({morePosts: false});
        }
        // console.log(this.state.loadedPosts);
    }
    render() {
        window.addEventListener('scroll', this.lazyLoader);
        const {loadedPosts} = this.state;
        const {logOut} = this.props;
        // console.log('LP',loadedPosts);
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
                    {(loadedPosts.length >= 1)
                        ? loadedPosts.map(post => {
                            return <Fragment key={post.id}>
                                <SinglePost post={post}/>
                            </Fragment>
                        })

                        : <LaodingPosts/>
}
                    {(LaodingPosts.length === 0 && this.state.morePosts)
                        ? <LaodingPosts/>
                        : <h4>There are no more posts</h4>
}
                </div>
            </div>
        );
    }
}

const mapState = state => {
    // console.log(state);
    return {post: state.PostReducer.post}
}
const mapDispatch = dispatch => {
    return {
        fetchPost: lastPostId => dispatch(fetchPost(lastPostId)),
        logOut:() => dispatch(logOut())
    }
}

export default compose(connect(mapState, mapDispatch))(UserPosts);
