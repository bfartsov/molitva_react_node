import React from "react";
import PageTitle from "../../main/pageTittle";
import VideoVideoPage from "../../videos/videoVideoPage";

const VideoPage = () => {
  return (
    <div id="main">
      <PageTitle title={"Видео"} />
      <section class="sermon-page">
        <div class="container">
          <div class="row">
            <div class="col-md-9 col-sm-7">
              <ul>
                <VideoVideoPage
                  img={
                    "https://cdn.molitvabg.org/images/resized_360x174x1570951873991_ruse.jpg"
                  }
                  title={"Обща регионална молитва, за Северен централен район"}
                  description={
                    "На 12 Октомври 2019 г. в гр. Русе се проведе бща регионална молитва, за Северен централен район."
                  }
                  url={""}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default VideoPage;
