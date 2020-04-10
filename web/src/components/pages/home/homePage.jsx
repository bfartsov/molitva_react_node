import React, { useState, Fragment } from "react";
import Banners from "../../banners/banner";
import Main from "../../main/main";

const HomePage = () => {
  return (
    <Fragment>
      <Banners />
      <Main />
    </Fragment>
  );
};
export default HomePage;
