import React from "react";

const LoadingCommentsPlaceholder = () => {
  return (
    <div className="loading-comments-placeholder">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingCommentsPlaceholder;
