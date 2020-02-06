import React from "react";
import HeaderInfo from "./headerInfo";
import CountDown from "./countDown";
import Menue from "./menu";

const Header = () => {
  return (
    <header id="header">
      <HeaderInfo />
      <CountDown />
      <Menue />
    </header>
  );
};
export default Header;
