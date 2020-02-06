import React from "react";

const VideoHomePage = ({ img, title, description }) => {
  return (
    <div className="col-md-4 col-sm-4">
      <div className="sermons-box">
        <div className="frame">
          <a href="/">
            <img src={img} alt={title} />
          </a>
          <a href="/watch/5d89cf6dbc5178577b80ba99">
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
