import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { fetchData } from "../../../utils/helpers";
import Table from "../../table";
import "../../../css/table-responsive.css";

function BannerPage() {
  const [banners, setBanners] = useState("");
  useEffect(() => {
    fetchData("http://localhost:8080/api/banners", setBanners);
  }, []);
  let title = {};
  let items = [];
  if (banners.length > 0) {
    banners.map(banner => {
      const item = {
        id: banner._id,
        title: banner.title,

        img: banner.banner,

        Date: banner.eventDate
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
          <i className="fa fa-angle-right"></i> Videos
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <i className="fa fa-angle-right"></i> Responsive Table
              </h4>
              <section id="unseen">
                {banners && (
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

export default BannerPage;
