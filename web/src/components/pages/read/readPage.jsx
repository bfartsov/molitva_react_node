import React, { useState, useEffect } from "react";
import { fetchData } from "../../../utils/helpers";
import PageTitle from "../../main/pageTittle";
import PageImg from "../../main/pageImg";

const Readepage = ({ match: { params } }) => {
  const [news, setNews] = useState("");

  useEffect(() => {
    fetchData(`http://localhost:8080/api/news/${params.link}`, setNews);
  }, []);
  return (
    <div id="main">
      <PageTitle title={news.title} />
      <section class="about-page">
        <div class="container">
          <PageImg img={"https://molitvabg.org/news/images/news.jpg"} />
          <div
            dangerouslySetInnerHTML={{
              __html: news.text
            }}
          ></div>
        </div>
      </section>
    </div>
  );
};

export default Readepage;
