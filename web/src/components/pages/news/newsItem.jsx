import React from "react";

const NewsItem = ({ img, title, description, link }) => {
  return (
    <li>
      <div className="latest-news">
        <div className="frame">
          <a href={`/news/${link}`}>
            <img src={img} alt={title} />
          </a>
        </div>
        <div className="text-box width">
          {" "}
          <strong className="title">{title}</strong>
          <p></p>
          <p
            dangerouslySetInnerHTML={{
              __html: description
            }}
          ></p>
          <a className="readmore" href={`/news/${link}`}>
            Прочети още
          </a>
        </div>
      </div>
    </li>
  );
};
export default NewsItem;
