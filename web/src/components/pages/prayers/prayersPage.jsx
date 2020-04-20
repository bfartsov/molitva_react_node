import React, { useState, useEffect } from "react";
import { fetchData } from "../../../utils/helpers";
import PageTitle from "../../main/pageTittle";
import PageImg from "../../main/pageImg";

//redux
import { connect } from "react-redux";
import { getPrayer } from "../../../redux/actions/nationalPrayer";
const PrayerPage = ({ match, getPrayer, prayer, loading }) => {
  useEffect(() => {
    getPrayer(match.params.year);
    // fetchData(
    //   `http://localhost:8080/api/nationalprayers/${props.match.params.year}`,
    //   setPrayer
    // );
  }, [match.params.year]);
  const toRender = !loading ? (
    <div id="main">
      <PageTitle title={prayer.title} />

      <section className="about-page">
        <div className="container">
          <PageImg img={prayer.img} />

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
  ) : (
    ""
  );

  return toRender;
};
const mapStateToProps = (state) => ({
  prayer: state.nationalPrayer.prayer,
  loading: state.nationalPrayer.loading,
});
export default connect(mapStateToProps, { getPrayer })(PrayerPage);
