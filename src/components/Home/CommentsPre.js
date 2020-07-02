// import React , { useEffect } from 'react'
// import {connect} from 'react-redux';
// import SingleComment from './SingleComment';
// import { fetchPostComments } from '../../store/Actions/PostActions';

// const Comments = (props) => {
//     const {comments , postId, fetchPostComments} = props;
//     useEffect(() => {
//         async function fetchComments(){
//             const next = await fetchPostComments(postId);
//             if (next && next.docs && next.docs.length >= 1) {
//                 console.log(props.comments);
//             }
//         }
//         fetchComments();
//     },[])
//     return (
//         <div className="comments">
//             <h6 onClick={() => fetchPostComments(postId)}>comments</h6>
//             {
//                 comments && comments.map(comment => {
//                     return <SingleComment postId={postId} key={comment.id} comment={comment} />
//                 })
//             }
//         </div>
//     )
// }

// const mapState = state => {
//     // console.log(state.PostReducer.commentReplies);
//     return {comments: state.PostReducer.commentReplies}
// }
// const mapDispatch = dispatch => {
//     return {
//         fetchPostComments:postId => dispatch(fetchPostComments(postId))
//     }
// }
// export default connect(mapState, mapDispatch)(Comments);
