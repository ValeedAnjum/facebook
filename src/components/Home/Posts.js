import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import SinglePost from './SinglePost';
import LaodingPosts from './LaodingPosts';
import { fetchPost, likePost, unlikePost } from '../../store/Actions/PostActions';
import { logOut } from '../../store/Actions/UserActions';
import CreatePost from './CreatePost';

class Posts extends Component {
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
        const scroolIsAtBottom = (document.documentElement.scrollHeight - window.innerHeight-1800) <= window.scrollY;
        if (scroolIsAtBottom && this.state.loading && this.state.morePosts) {
            this.setState({loading: false});
            await this.loadNextPost();
            this.setState({loading: true});
        }
    }
    loadNextPost = async() => {
        const {post} = this.props;
        const lastPostId = post && post.length>=1 && post[post.length - 1].id;
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
    }
    componentWillUnmount(){
        this.props.cancelFetching();
    }
    render() {
        window.addEventListener('scroll', this.lazyLoader);
        const {loadedPosts} = this.state;
        const {logOut , photoUrl, likePost, unlikePost} = this.props;
        return (
            <div className="user-posts">
                <h4 className="not-fully-responsive">This is not responsive version</h4>
                <CreatePost photoUrl={photoUrl} />
                <div className="posts-container">
                    {(loadedPosts.length >= 1)
                        ? loadedPosts.map(post => {
                            return <Fragment key={post.id}>
                                <SinglePost likePost={likePost} unlikePost={unlikePost} post={post}/>
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
        logOut:() => dispatch(logOut()),
        likePost:post => dispatch(likePost(post)),
        unlikePost:post => dispatch(unlikePost(post)),
        cancelFetching:() => dispatch({type:'FETCH_POST_START',payload:[]})
    }
}

export default compose(connect(mapState, mapDispatch))(Posts);
