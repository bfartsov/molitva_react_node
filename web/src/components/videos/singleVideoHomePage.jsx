import React from "react";

const VideoHomePage = ({ img, title, description, _id }) => {
  return (
    <div className="col-md-4 col-sm-4">
      <div className="sermons-box">
        <div className="frame">
          <a href={`/watch/${_id}`}>
            <img src={img} alt={title} />
          </a>
          <a href={`/watch/${_id}`}>
            <div className="caption">
              <div className="inner">
                <p>{description}</p>
              </div>
            </div>
          </a>
        </div>
        <div className="text-box">
          <h4>{title}</h4>
        </div>
      </div>
    </div>
  );
};
export default VideoHomePage;
