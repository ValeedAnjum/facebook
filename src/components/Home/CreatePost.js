import React , { useState } from 'react'
import Resizer from 'react-image-file-resizer';
import { connect } from 'react-redux';
import {addPost} from '../../store/Actions/UserActions';
const CreatePost = ({ photoUrl, addPost }) => {
    const [file, setfile] = useState(null);
    const [userStory, setuserStory] = useState("");
    const imageClickHandler = () => {
        document.getElementById('user-post-image').click();
    }
    const fileChangedHandler  = event => {
        var fileInput = false
        if(event.target.files[0]) {
            fileInput = true
        }
        if(fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                500,
                300,
                'JPEG',
                100,
                0,
                uri => {
                    setfile(uri);
                    if(uri){
                        var demoImage = document.getElementById('display-user-post-image');
                        demoImage.src = uri;
                    }
                },
                'base64'
            );
        }
    }
    const savePost = async () => {
        await addPost(file,userStory);
        console.log('back');
    }
    const handleUserStory = event => {
        setuserStory(event.target.value);
    }
    return (
        <div className="create-post">
            <h4>Create Post</h4>
            <div className="user-image-and-content">
                {photoUrl
                    ? <img src={photoUrl} alt="user-img"/>
                    : null
                }
                <textarea
                    placeholder="What's on your mind, Valeed?"
                    value={userStory} onChange={handleUserStory}
                />
            </div>
            <div className="upload-content">
                <div className="upload-picture">
                    <input type="file" id="user-post-image" onChange={fileChangedHandler} />
                    <button onClick={imageClickHandler}>Photo</button>
                </div>
                <div className="upload-video">
                    <input type="file" />
                    <button>Video</button>
                </div>
            </div>
            <div className="user-post-image">
                {
                    file ? <img src={file} id="display-user-post-image" />:null
                }
            </div>
            <div className="post-button-container">
                <button onClick={savePost}>Post</button>
            </div>
        </div>
    )
}

const mapState = state => {
    return {

    }
}
const mapDispatch = dispatch => {
    return {
        addPost:(file,userStory) => dispatch(addPost(file,userStory))
    }
}
export default connect(mapState,mapDispatch)(CreatePost);
