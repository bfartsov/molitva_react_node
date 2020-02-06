import React from "react";
import NewsItem from "./newsItem";

const News = ({ newsHome }) => {
  return (
    <section className="news-timelines-box">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Новини</h3>
            {newsHome.length > 0 &&
              newsHome.map(item => (
                <NewsItem
                  key={item.link}
                  img={item.img}
                  title={item.title}
                  link={item.link}
                  description={item.description}
                />
              ))}
          </div>
          <div className="col-md-6">
            <h3>Галерия</h3>
            <div className="timelines-box"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default News;
