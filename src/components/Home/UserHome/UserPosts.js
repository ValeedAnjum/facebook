import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import SinglePost from './SinglePost';
import LaodingPosts from './LaodingPosts';
import {fetchPost} from '../../../store/Actions/PostActions';

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
    lazyLoader =  async () => {
        const scroolIsAtBottom = (document.documentElement.scrollHeight - window.innerHeight) === window.scrollY;
        if(scroolIsAtBottom && this.state.loading){
            this.setState({loading:false});
            await this.loadNextPost();
            this.setState({loading:true});
        }else{
            console.log('Shan');
        }
    }
    loadNextPost = async() => {
        const {post} = this.props;
        const lastPostId = post && post[post.length - 1].id;
        console.log("nextpost");
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
        // console.log(this.state.loadedPosts);
    }
    render() {
        window.addEventListener('scroll', this.lazyLoader);
        const {fetchPost, post} = this.props;
        const {loadedPosts} = this.state;
        console.log('LP',loadedPosts);
        return (
            <div className="user-posts" onClick={() => this.lazyLoader()}>
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
                                <SinglePost/>
                            </Fragment>
                        })

                        : <LaodingPosts/>
}
                    {(LaodingPosts.length === 0)
                        ? <LaodingPosts/>
                        : null
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
        fetchPost: lastPostId => dispatch(fetchPost(lastPostId))
    }
}

export default compose(connect(mapState, mapDispatch))(UserPosts);
