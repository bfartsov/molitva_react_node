import React, { useEffect } from "react";
import Alert from '../../alert'
import { connect } from "react-redux";
import { getVideos, removeVideo } from "../../../redux/actions/videos";

import "../../../css/table-responsive.css";

const VideoPage = ({ getVideos, videos, loading, history, location, removeVideo }) => {
  useEffect(() => {
    getVideos();
  }, []);

  const handleDelete = (id) => {
      removeVideo(id)
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
              <Alert/>

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
                    {videos.length>0 && videos.map(video => {
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
                              onClick={()=>handleDelete(video._id)}
                              className="btn remove btn-danger btn-xs"
                            >
                              <i className="fa fa-trash-o "></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
               
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
  loading: state.videos.loading
});
export default connect(mapStateToProps, { getVideos, removeVideo })(VideoPage);
