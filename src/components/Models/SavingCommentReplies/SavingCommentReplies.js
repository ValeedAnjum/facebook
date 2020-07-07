import React, {Fragment} from 'react'
import ModelOverlay from '../ModelOverlay'
import SingleComment from '../../Home/SingleComment'
import CommentInput from '../../Home/CommentInput'

const SavingCommentReplies = () => {
    return (
        <Fragment>
            <ModelOverlay/>
            <div className="comments">
            <div className="saving-comment-replies">
                <input type="text" />
            </div>
            </div>
        </Fragment>
    )
}

export default SavingCommentReplies
