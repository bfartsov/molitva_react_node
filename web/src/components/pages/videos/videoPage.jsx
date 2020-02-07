import React, { useState, useEffect } from "react";
import PageTitle from "../../main/pageTittle";
import VideoVideoPage from "../../videos/videoVideoPage";

const VideoPage = props => {
  const [videos, setVideos] = useState("");
  const fetchData = async (url, cb, number) => {
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      cb(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(
      `http://localhost:8080/api/videos/year/${props.match.params.year}`,
      setVideos
    );
  }, []);

  return (
    <div id="main">
      <PageTitle title={"Видео"} />
      <section className="sermon-page">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7">
              <ul>
                {videos.length > 0 &&
                  videos.map(video => {
                    String.prototype.trunc =
                      String.prototype.trunc ||
                      function(n) {
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
export default VideoPage;
