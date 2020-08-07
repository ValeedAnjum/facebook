import React from 'react'
import ReactPlaceholder from 'react-placeholder';
const ImageLoadingPlaceholder = ({style,placeholderStyle}) => {
    return (
        <div style={{...style}}>
            <ReactPlaceholder
                type='round'
                ready={false}
                color='#E0E0E0'
                style={placeholderStyle ? {...placeholderStyle}:null}
                showLoadingAnimation={true}
                ></ReactPlaceholder>
        </div>
    )
}

export default ImageLoadingPlaceholder;
