import React from "react";

const VideoVideoPage = ({ img, title, description, url }) => {
  return (
    <li>
      <div className="sermon-box">
        <div className="frame">
          <a href={url}>
            <img src={img} alt={title} />
          </a>
        </div>
        <div className="text-box">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </li>
  );
};
export default VideoVideoPage;
