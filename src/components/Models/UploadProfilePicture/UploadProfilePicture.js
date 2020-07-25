import React , { useState, Fragment } from 'react';
import Resizer from 'react-image-file-resizer';
import ModelOverlay from '../ModelOverlay';

const UploadProfilePicture = ({uploadProfilePicture , uploading}) => {
    const [file, setfile] = useState(null);
    
    const fileChangedHandler  = event => {
        // var demoImage = document.querySelector('img');
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
                    // console.log(uri)
                    // var demoImage = document.getElementById('display-profile-image');
                    setfile(uri);
                    if(uri){
                        var demoImage = document.getElementById('display-profile-image');
                        demoImage.src = uri;
                    }
                },
                'base64'
            );
        }
    }
    const selectPicture = () => {
        document.getElementsByClassName('select-image')[0].click();
    }
    const uploadProfilePictureLocal = () => {
        uploadProfilePicture(file);
    }
    return (
        <Fragment>
            <ModelOverlay />
            <div className="upload-pictures-profile">
                <div className="button-container">
                    <button onClick={selectPicture}>Select Picture</button>
                    {/* <button >Chose Random Picture</button> */}
                </div>
                <div className="upload-picture">
                    <form method='POST' encType='multipart/form-data' onSubmit={e => {e.preventDefault()}} >
                        <input type='file' onChange={fileChangedHandler} className="select-image" />
                    </form>
                    { file && <img src={file} alt="not available" id="display-profile-image" />}
                    { file && <button onClick={uploadProfilePictureLocal}>{!uploading ? 'Upload Picture':'Uploading'}</button>}
                </div>
            </div>
        </Fragment>
    )
}

export default UploadProfilePicture;