import React from "react";
import VideoHomePage from "../videos/singleVideoHomePage";
const VideosHomePage = ({ videos }) => {
  return (
    <section className="latest-sermons-box">
      <div className="container">
        <h3>Видеа</h3>
        <div className="row">
          {videos.length > 0 &&
            videos.map(video => {
              return (
                <VideoHomePage
                  key={video.title}
                  title={video.title}
                  img={video.img}
                  description={video.description}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};
export default VideosHomePage;
