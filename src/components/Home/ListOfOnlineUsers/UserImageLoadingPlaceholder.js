import React from 'react'
import ReactPlaceholder from 'react-placeholder';
const UserImageLoadingPlaceholder = () => {
    return (
        <div className="online-user-image-placeholder">
             <ReactPlaceholder
                type='round'
                ready={false}
                color='#E0E0E0'
                showLoadingAnimation={true}
                style={{width:'35px',height:'35px',marginRight:'5px'}}
                ></ReactPlaceholder>
        </div>
    )
}

export default UserImageLoadingPlaceholder
