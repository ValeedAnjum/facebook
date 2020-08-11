import React, { Fragment } from "react";
import PropTypes from "prop-types";
const SinglePostOptions = ({ name }) => {
  return (
    <Fragment>
      <div className="options-container">
        <div className="option">
          <div className="option-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="option-name-and-description">
            <div className="name">Save Post</div>
            <div className="description">Add this post to your saved items</div>
          </div>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="option-name-and-description">
            <div className="name">Turn on notification for this post</div>
            <div className="description">Turn on notification</div>
          </div>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="option-name-and-description">
            <div className="name">Embed</div>
            <div className="description">Embed</div>
          </div>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="option-name-and-description">
            <div className="name">Snooze {name} for 30 days</div>
            <div className="description">temporarily stop seeing posts</div>
          </div>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="option-name-and-description">
            <div className="name">Unfollow {name}</div>
            <div className="description">
              Stop seeing posts but stay friends
            </div>
          </div>
        </div>
        <div className="option">
          <div className="option-icon">
            <i className="fas fa-sync-alt"></i>
          </div>
          <div className="option-name-and-description">
            <div className="name">Find support or report post</div>
            <div className="description">I'm concerned about this post</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SinglePostOptions.propTypes = {
  name: PropTypes.string,
};

export default SinglePostOptions;
