import React , { useState } from 'react'
import Resizer from 'react-image-file-resizer';
import { connect } from 'react-redux';
import {addPost} from '../../store/Actions/UserActions';
<<<<<<< HEAD
import { fetchPost } from '../../store/Actions/PostActions';
const CreatePost = ({ photoUrl, addPost, uploading, uploadingPercentage }) => {
    const [image, setimage] = useState(null);
    const [video, setvideo] = useState(null);
=======
const CreatePost = ({ photoUrl, addPost }) => {
    const [file, setfile] = useState(null);
>>>>>>> parent of c49ba83... video and images uploading to firebase storage
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
<<<<<<< HEAD
                    setimage(uri);
                    setvideo(null);
=======
                    setfile(uri);
>>>>>>> parent of c49ba83... video and images uploading to firebase storage
                    if(uri){
                        var demoImage = document.getElementById('display-user-post-image');
                        demoImage.src = uri;
                    }
                },
                'base64'
            );
        }
    }
<<<<<<< HEAD
    const videoChnageHandler = event => {
        // console.log(event.target.files[0]);
        const file = event.target.files[0];
        const { size } = file;
        const sizeInMb = Math.round(Number(size/1024/1024));
        // if(sizeInMb > 20){
        //     alert('video size should not be grater then 20 MB');
        //     return;
        // }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            setvideo(reader.result);
            setimage(null);
        }
    }
    const savePost = () => {
        if(image){
            addPost(image,userStory.trim());
        }else if(video){
            addPost(video,userStory.trim());
        }else if(userStory.trim().length > 0){
            addPost(null,userStory.trim());
        }
=======
    const savePost = async () => {
        await addPost(file,userStory);
        console.log('back');
>>>>>>> parent of c49ba83... video and images uploading to firebase storage
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
<<<<<<< HEAD
                    <input type="file" id="user-post-image" accept="image/*" onChange={imageChangedHandler} />
                    <input type="file" id="user-post-video" accept="video/*" onChange={videoChnageHandler} />
=======
                    <input type="file" id="user-post-image" onChange={fileChangedHandler} />
>>>>>>> parent of c49ba83... video and images uploading to firebase storage
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
<<<<<<< HEAD
                {
                    !uploading ? <button
                    onClick={savePost}>Post</button>:<button>Posting...({
                        uploadingPercentage ? uploadingPercentage.toFixed(2):null}%)</button>
                }
                
=======
                <button onClick={savePost}>Post</button>
>>>>>>> parent of c49ba83... video and images uploading to firebase storage
            </div>
        </div>
    )
}

const mapState = state => {
    return {
<<<<<<< HEAD
        uploading:state.User.uploading,
        uploadingPercentage:state.User.uploadingPercentage        
=======

>>>>>>> parent of c49ba83... video and images uploading to firebase storage
    }
}
const mapDispatch = dispatch => {
    return {
        addPost:(file,userStory) => dispatch(addPost(file,userStory))
    }
}
export default connect(mapState,mapDispatch)(CreatePost);
