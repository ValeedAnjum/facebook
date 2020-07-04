import React , { Component ,useEffect } from 'react'
import {connect} from 'react-redux';
import SingleComment from './SingleComment';
import { fetchPostComments } from '../../store/Actions/PostActions';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';


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
        const { fetchPostComments , postId, comments } = this.props;
        const { loadedComments } = this.state;
        return (
            <div className="comments">
            {
                comments && comments.length>=1 && comments.map(comment => {
                    return <SingleComment postId={postId} key={comment.id} comment={comment} />
                })
            }
        </div>
        )
    }
}



const mapState = state => {
    // console.log(comments: state.PostReducer.postComments);
    console.log(state.firestore.ordered.comments);
    // return {comments: state.PostReducer.postComments}
    return {comments: state.firestore.ordered.comments}
}
const mapDispatch = dispatch => {
    return {
        fetchPostComments:postId => dispatch(fetchPostComments(postId))
    }
}

export default compose(
    connect(mapState, mapDispatch),
    firestoreConnect(props => props.postId && [{
        collection:'comments',
        where:['postid','==','dMDqQSpxsXZrI4qIHAM5']
    }])
)(Comments);
