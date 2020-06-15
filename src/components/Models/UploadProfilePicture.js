import React , { useState } from 'react';
import Resizer from 'react-image-file-resizer';

const UploadProfilePicture = ({uploadProfilePicture}) => {
    const [file, setfile] = useState(null);
    
    const fileChangedHandler  = event => {
        var demoImage = document.querySelector('img');
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
                    var demoImage = document.querySelector('img');
                    setfile(uri);
                    demoImage.src = uri;
                },
                'base64'
            );
        }
    }
    const selectPicture = () => {
        document.getElementsByClassName('select-image')[0].click();
    }
    return (
        <div className="upload-pictures-profile">
            <div className="button-container">
                <button onClick={selectPicture}>Select Picture</button>
                <button >Chose Random Picture</button>
            </div>
            <div className="upload-picture">
                <form method='POST' encType='multipart/form-data' onSubmit={e => {e.preventDefault()}} >
                    <input type='file' onChange={fileChangedHandler} className="select-image" />
                </form>
                { file && <img src={file} alt="not available" />}
                { file && <button onClick={() => uploadProfilePicture(file)}>Upload Picture</button>}
            </div>
            
        </div>
    )
}

export default UploadProfilePicture;
