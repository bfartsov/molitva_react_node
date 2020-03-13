import React, { useEffect } from "react";
import Table from "../../table";
import { connect } from "react-redux";
import { getVideos } from "../../../redux/actions/videos";

import "../../../css/table-responsive.css";

const VideoPage = ({ getVideos, videos, loading, history, location }) => {
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
                <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Id</th>
                      <th> Title</th>
                      <th> Date</th>
                      <th> Image</th>
                      <th> Video</th>
                      <th> Year</th>
                      <th> Feature</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {videos.map(video => {
                      return (
                        <tr key={video._id}>
                          <td> {video._id}</td>
                          <td> {video.title}</td>
                          <td> {video.dateCreated}</td>
                          <td> {video.img}</td>
                          <td> {video.video}</td>
                          <td> {video.date}</td>
                          <td> {video.feature}</td>
                          <td>
                            <button
                              onClick={() => {
                                history.push(
                                  `${location.pathname}/edit/${video._id}`
                                );
                              }}
                              className="btn btn-primary btn-xs"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              id={video._id}
                              onClick={handleDelete}
                              className="btn btn-danger btn-xs"
                            >
                              <i className="fa fa-trash-o "></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* {videos.length > 0 && !loading && (
                  <Table
                    titles={title}
                    items={items}
                    handleDelete={handleDelete}
                  />
                )} */}
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
