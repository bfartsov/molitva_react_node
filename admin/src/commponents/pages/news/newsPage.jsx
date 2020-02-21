import React, { useEffect, useState } from "react";
import { fetchData } from "../../../utils/helpers";
import Table from "../../table";
import "../../../css/table-responsive.css";

function NewsPage() {
  const [news, setNews] = useState("");
  useEffect(() => {
    fetchData("http://localhost:8080/api/news", setNews);
  }, []);
  let title = {};
  let items = [];
  if (news.length > 0) {
    news.map(event => {
      const item = {
        id: event._id,
        title: event.title,
        img: event.img,
        date: event.date,
        link: event.link
      };
      items.push(item);
    });
  }
  items.length > 0 ? (title = Object.keys(items[0])) : (title = {});
  const handleDelete = e => {
    e.preventDefault();
  };
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> news
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <i className="fa fa-angle-right"></i> Responsive Table
              </h4>
              <section id="unseen">
                {news && (
                  <Table
                    titles={title}
                    items={items}
                    handleDelete={handleDelete}
                  />
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default NewsPage;
