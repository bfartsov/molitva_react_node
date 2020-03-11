import React, { useEffect } from "react";
import Table from "../../table";
import { connect } from "react-redux";
import { getVideos } from "../../../redux/actions/videos";

import "../../../css/table-responsive.css";

const VideoPage = ({ getVideos, title, items, videos, loading }) => {
  useEffect(() => {
    getVideos();
  }, []);

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
                {videos.length > 0 && !loading && (
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
};
const mapStateToProps = state => ({
  videos: state.videos.videos,
  items: state.videos.items,
  title: state.videos.title,
  loading: state.videos.loading
});
export default connect(mapStateToProps, { getVideos })(VideoPage);
