import React from "react";

const NewsItem = ({ img, title, description, link }) => {
  return (
    <div className="outer">
      <div className="latest-news">
        <div className="frame">
          <a href={`/${link}`}>
            <img src={img} alt="img" />
          </a>
        </div>
        <div className="text-box">
          <strong className="title">{title}</strong>
          <p>{description}</p>
          <a href={`news/${link}`} className="readmore">
            Прочети още
          </a>
        </div>
      </div>
    </div>
  );
};
export default NewsItem;
