import React, { useEffect, useState } from "react";
import { fetchData } from "../../../utils/helpers";
import Table from "../../table";
import "../../../css/table-responsive.css";

function VideoPage() {
  const [videos, setVideos] = useState("");
  useEffect(() => {
    fetchData("http://localhost:8080/api/videos", setVideos);
  }, []);
  let title = {};
  let items = [];
  if (videos.length > 0) {
    videos.map(video => {
      const item = {
        title: video.title,
        description: video.description,
        img: video.img,
        video: video.video,
        date: video.date,
        feature: video.feature
      };
      items.push(item);
    });
  }
  items.length > 0 ? (title = Object.keys(items[0])) : (title = {});
  const handeEdit = e => {
    e.preventDefault();
    console.log(e.target.id);
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
                {videos && (
                  <Table titles={title} items={items} handleEdit={handeEdit} />
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default VideoPage;
