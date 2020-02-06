import React from "react";
import NewsItem from "./newsItem";

const News = () => {
  const news = [
    {
      img: "https://cdn.molitvabg.org/images/1568631415185obzor-2017.jpg",
      title: "Втора национална пасторска среща",
      slug: "vtora-nachionalna-pastorska-sreshta",
      description:
        "На 24 февруари 2018 г. в Пловдив се проведе втора национална пасторска среща. Присъстваха около 140 пастори и служители от почти всички евангелски деноминации в страната, дошли от всички части на България."
    },
    {
      img: "https://cdn.molitvabg.org/images/1568631415185obzor-2017.jpg",
      title: "Обзор за 2017 г.",
      slug: "obzor-2017",
      description:
        "През 2017 г. се проведоха шест регионални общи молитвени събрания в България. В тях взеха участие общо около: 140 пастори и 5200 вярващи от почти всички евангелски деноминации, от всички географски части на България."
    }
  ];
  return (
    <section className="news-timelines-box">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h3>Новини</h3>
            {news.map(item => (
              <NewsItem
                key={item.slug}
                img={item.img}
                title={item.title}
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
