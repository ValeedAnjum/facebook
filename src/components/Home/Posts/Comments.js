import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import SingleComment from './SingleComment';
import {fetchPostComments} from '../../../store/Actions/PostActions';
import CommentInput from './CommentInput';
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
        const { postId, loadingComments} = this.props;
        const { photoUrl } = this.props.profile;
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
                    <img src={photoUrl} alt="user-img"/>
                    <CommentInput
                        postId={postId}
                        addCommentLocally={(message, commentId) => this.addCommentLocally(message, commentId)}/>
                </div>
            </div>
        )
    }
}

Comments.propTypes = {
    comments:PropTypes.array,
    profile:PropTypes.object,
    loadingComments:PropTypes.bool,
    fetchPostComments:PropTypes.func
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
