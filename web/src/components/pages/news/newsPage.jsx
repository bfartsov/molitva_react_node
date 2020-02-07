import React, { useState, useEffect } from "react";
import PageTitle from "../../main/pageTittle";
import NewsItem from "./newsItem";
import { fetchData } from "../../../utils/helpers";

import "../../../css/custom.css";

const NewsPage = () => {
  const [news, setNews] = useState("");
  useEffect(() => {
    fetchData("http://localhost:8080/api/news", setNews);
  }, []);
  return (
    <div id="main">
      <PageTitle title={"Новини"} />

      <section className="news-listing">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7">
              <ul>
                {news.length > 0 &&
                  news.map(item => {
                    String.prototype.trunc =
                      String.prototype.trunc ||
                      function(n) {
                        return this.length > n
                          ? this.substr(0, n - 1) + " ...;"
                          : this;
                      };
                    return (
                      <NewsItem
                        key={item._id}
                        title={item.title}
                        img={item.img}
                        description={item.text.trunc(150)}
                        link={item.link}
                      />
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default NewsPage;
