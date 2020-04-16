import React, { useState, useEffect } from "react";
import HeaderInfo from "./headerInfo";
import CountDown from "./countDown";
import Menue from "./menu";
import { getMenus } from "../../redux/actions/menus";
import { connect } from "react-redux";

const Header = ({ menus, getMenus }) => {
  useEffect(() => {
    getMenus();
  }, []);
  return (
    <header id="header">
      <HeaderInfo />
      <CountDown />
      <Menue menus={menus.menus} />
    </header>
  );
};

const mapStateToProps = (state) => ({
  menus: state.menus,
});
export default connect(mapStateToProps, { getMenus })(Header);
