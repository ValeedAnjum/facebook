import React , { useState, useEffect } from 'react'
import Resizer from 'react-image-file-resizer';
import { connect } from 'react-redux';
import { addPost } from '../../../store/Actions/PostActions';
const CreatePost = ({ photoUrl, addPost, uploading, uploadingPercentage }) => {
    const [image, setimage] = useState(null);
    const [video, setvideo] = useState(null);
    const [userStory, setuserStory] = useState("");
    const imageClickHandler = () => {
        document.getElementById('user-post-image').click();
    }
    const videoClickHandler = () => {
        document.getElementById('user-post-video').click();
    }
    const imageChangedHandler  = event => {
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
                    setimage(uri);
                    setvideo(null);
                    if(uri){
                        var demoImage = document.getElementById('display-user-post-image');
                        demoImage.src = uri;
                    }
                },
                'base64'
            );
        }
    }
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
    }
    const handleUserStory = event => {
        setuserStory(event.target.value);
    }
    useEffect(() => {
        if(!uploading){
            setimage(null);
            setuserStory("");
        }
    },[uploading])
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
                    <input type="file" id="user-post-image" accept="image/*" onChange={imageChangedHandler} />
                    <input type="file" id="user-post-video" accept="video/*" onChange={videoChnageHandler} />
                    <button onClick={imageClickHandler}>Photo</button>
                </div>
                <div className="upload-video">
                    <input type="file" />
                    <button onClick={videoClickHandler}>Video</button>
                </div>
            </div>
            <div className="user-post-image">
                {
                    image ? <img src={image} id="display-user-post-image" />:null
                }
                {
                    video ? <video src={video} controls />:null
                }
            </div>
            <div className="post-button-container">
                {
                    !uploading ? <button
                    onClick={savePost}>Post</button>:<button>Posting...({
                        uploadingPercentage ? uploadingPercentage.toFixed(2):null}%)</button>
                }
                
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        uploading:state.User.uploading,
        uploadingPercentage:state.User.uploadingPercentage        
    }
}
const mapDispatch = dispatch => {
    return {
        addPost:(file,userStory) => dispatch(addPost(file,userStory))
    }
}
export default connect(mapState,mapDispatch)(CreatePost);
