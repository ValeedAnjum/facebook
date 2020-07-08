import React, {Component, useEffect, Fragment} from 'react'
import {connect} from 'react-redux';
import SingleComment from './SingleComment';
import {fetchPostComments} from '../../store/Actions/PostActions';
import CommentInput from './CommentInput';
import LaodingPosts from './LaodingPosts';
import LoadingCommentsPlaceholder from './LoadingCommentsPlaceholder';

export class Comments extends Component {
    state = {
        loadedComments: []
    }
    async componentDidMount() {
        const next = await this
            .props
            .fetchPostComments(this.props.postId);
        if (next && next.docs && next.docs.length >= 1) {
            this.setState({loadedComments: this.props.comments});
        }
    }
    addCommentLocally = (message, commentId) => {
        const {fname, lname, photoUrl} = this.props.profile;
        let newComment = {
            message: message,
            name: `${fname} ${lname}`,
            profileimage: photoUrl,
            id: commentId
        }
        const updatedComments = [
            ...this.state.loadedComments,
            newComment
        ];
        this.setState({loadedComments: updatedComments})
    }
    render() {
        const {fetchPostComments, postId, loadingComments} = this.props;
        const {loadedComments} = this.state;
        return (
            <div className="comments">
                {loadedComments && loadedComments.length >= 1 && loadedComments.map((comment, index) => {
                    return <SingleComment postId={postId} key={index} comment={comment}/>
                })
                }
                {
                    loadingComments ? <LoadingCommentsPlaceholder /> :null
                }
                {
                    loadedComments.length === 0 && !loadingComments && <h4 
                    style={{textAlign:'center',color:'#606770'}}>No Comments</h4>
                }
                <div className="post-comment">
                    <img src="style/images/user.jpg" alt="user-img"/>
                    <CommentInput
                        postId={postId}
                        addCommentLocally={(message, commentId) => this.addCommentLocally(message, commentId)}/>
                </div>
            </div>
        )
    }
}

const mapState = state => {
    return {
        comments: state.PostReducer.postComments, 
        profile: state.firebase.profile,
        loadingComments: state.PostReducer.loadingComments
    }
}
const mapDispatch = dispatch => {
    return {
        fetchPostComments: postId => dispatch(fetchPostComments(postId))
    }
}
export default connect(mapState, mapDispatch)(Comments);
