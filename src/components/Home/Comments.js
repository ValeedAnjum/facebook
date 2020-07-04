import React , { Component ,useEffect } from 'react'
import {connect} from 'react-redux';
import SingleComment from './SingleComment';
import { fetchPostComments } from '../../store/Actions/PostActions';
import CommentInput from './CommentInput';


export class Comments extends Component {
    state = {
        loadedComments:[]
    }
    async componentDidMount() {
        const next = await this
            .props
            .fetchPostComments(this.props.postId);
        if (next && next.docs && next.docs.length >= 1) {
            this.setState({loadedComments:this.props.comments});
        }
    }
    addCommentLocally = message => {
        const { fname, lname, photoUrl} = this.props.profile;
        let newComment = {message:message,name:`${fname} ${lname}`,profileimage:photoUrl}
        const updatedComments = [...this.state.loadedComments,newComment];
        this.setState({
            loadedComments:updatedComments
        })
    }
    render() {
        const { fetchPostComments , postId } = this.props;
        const { loadedComments } = this.state;
        // console.log(postId);
        return (
            <div className="comments">
            {
                loadedComments && loadedComments.length>=1 && loadedComments.map((comment, index) => {
                    return <SingleComment postId={postId} key={index} comment={comment} />
                })
            }
            <div className="post-comment">
                <img src="style/images/user.jpg" alt="user-img"/>
                <CommentInput postId={postId} addCommentLocally={(message) => this.addCommentLocally(message)} />
            </div>
        </div>
        )
    }
}



const mapState = state => {
    // console.log(state.firebase.profile);
    return {
        comments: state.PostReducer.postComments,
        profile:state.firebase.profile
    }
}
const mapDispatch = dispatch => {
    return {
        fetchPostComments:postId => dispatch(fetchPostComments(postId))
    }
}
export default connect(mapState, mapDispatch)(Comments);
