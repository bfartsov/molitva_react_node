import React, { useState, useEffect } from "react";
import { fetchData } from "../../../utils/helpers";
import PageTitle from "../../main/pageTittle";
import PageImg from "../../main/pageImg";
const PrayerPage = props => {
  const [prayer, setPrayer] = useState("");
  useEffect(() => {
    fetchData(
      `http://localhost:8080/api/nationalprayers/${props.match.params.year}`,
      setPrayer
    );
  }, [props.match.params.year]);
  return (
    <div id="main">
      <PageTitle title={prayer.title} />

      <section className="about-page">
        <div className="container">
          <PageImg
            img={
              "https://cdn.molitvabg.org/images/resized_1120x342x1570527156170_varna-natiional-prayer.jpg"
            }
          />

          <h1>{prayer.title}</h1>
          <iframe
            title={prayer.year}
            src={prayer.video}
            allow="autoplay; encrypted-media"
            allowFullScreen=""
            width="854"
            height="480"
            frameBorder="0"
          ></iframe>
          <div dangerouslySetInnerHTML={{ __html: prayer.text }}></div>
        </div>
      </section>
    </div>
  );
};

export default PrayerPage;
