import React, { Fragment } from "react";
import TopBar from "./topBar";
import Aside from "./aside";

const Header = () => {
  return (
    <Fragment>
      <TopBar />
      <Aside />
    </Fragment>
  );
};

export default Header;
