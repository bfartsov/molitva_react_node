import React, { useState, useEffect } from "react";
import PageTitle from "../../main/pageTittle";
import VideoVideoPage from "../../videos/videoVideoPage";

//redux
import { connect } from "react-redux";
import { getVideos } from "../../../redux/actions/video";

const VideoPage = ({ match, getVideos, videos }) => {
  useEffect(() => {
    getVideos(match.params.year);
  }, [match.params.year]);
  return (
    <div id="main">
      <PageTitle title={"Видео"} />
      <section className="sermon-page">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7">
              <ul>
                {videos.length > 0 &&
                  videos.map((video) => {
                    String.prototype.trunc =
                      String.prototype.trunc ||
                      function (n) {
                        return this.length > n
                          ? this.substr(0, n - 1) + " ...;"
                          : this;
                      };

                    return (
                      <VideoVideoPage
                        key={video._id}
                        img={video.img}
                        title={video.title}
                        description={video.description.trunc(155)}
                        url={`/watch/${video._id}`}
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

const mapStateToProps = (state) => ({
  videos: state.videos.videos,
});
export default connect(mapStateToProps, { getVideos })(VideoPage);
