import React from 'react'
import ReactPlaceholder from 'react-placeholder';
const PictureLoadingPlaceholder = () => {
    return (
        <div className="navbar-user-picture-placeholder">
            <ReactPlaceholder
                type='round'
                ready={false}
                color='#E0E0E0'
                showLoadingAnimation={true}
                ></ReactPlaceholder>
        </div>
    )
}

export default PictureLoadingPlaceholder;
