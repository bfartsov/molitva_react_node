import React, { useState, Fragment, useEffect } from "react";
import Banners from "../../banners/banner";
import Main from "../../main/main";
import { getBanners } from "../../../redux/actions/banners";
import { connect } from "react-redux";

const HomePage = ({ getBanners, banners }) => {
  useEffect(() => {
    getBanners();
  }, [banners.loading]);
  return (
    <Fragment>
      <Banners banners={banners.banners} />
      <Main />
    </Fragment>
  );
};

const mapStateToProp = (state) => ({
  banners: state.banners,
});

export default connect(mapStateToProp, { getBanners })(HomePage);
