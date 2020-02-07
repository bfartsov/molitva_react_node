import React, { useState, useEffect } from "react";
import PageTitle from "../../main/pageTittle";

const WatchPage = ({ match: { params } }) => {
  const [video, setVideo] = useState("");
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
    fetchData(`http://localhost:8080/api/videos/id/${params.id}`, setVideo);
  }, []);
  console.log(video);
  return (
    <div id="main">
      {video.title && <PageTitle title={video.title} />}

      <section className="blog-detail sermon-detail">
        <div className="container">
          <div className="col-md-9 col-sm-7">
            <div className="sermon-frame">
              <iframe
                title={video.title}
                src={video.video}
                style={{ width: "100%", height: "450px", border: 0 }}
                allowFullScreen=""
                frameBorder="0"
              ></iframe>
              <div className="sermon-detail-row"> </div>
            </div>
            <h2></h2>
            <blockquote>
              <i className="fa"></i>
              <q>{video.description}</q>
              <i className="fa"></i>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WatchPage;
