import React , { Component ,useEffect } from 'react'
import {connect} from 'react-redux';
import SingleComment from './SingleComment';
import { fetchPostComments } from '../../store/Actions/PostActions';


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
    render() {
        const { fetchPostComments , postId } = this.props;
        const { loadedComments } = this.state;
        return (
            <div className="comments">
            {
                loadedComments && loadedComments.length>=1 && loadedComments.map(comment => {
                    return <SingleComment postId={postId} key={comment.id} comment={comment} />
                })
            }
        </div>
        )
    }
}



const mapState = state => {
    // console.log(state.PostReducer.commentReplies);
    return {comments: state.PostReducer.commentReplies}
}
const mapDispatch = dispatch => {
    return {
        fetchPostComments:postId => dispatch(fetchPostComments(postId))
    }
}
export default connect(mapState, mapDispatch)(Comments);
