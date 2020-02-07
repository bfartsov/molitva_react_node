import React, { useState, useEffect } from "react";
import HeaderInfo from "./headerInfo";
import CountDown from "./countDown";
import Menue from "./menu";

const Header = () => {
  const [menus, setMenus] = useState("");
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
    fetchData("http://localhost:8080/api/menus", setMenus);
  }, []);
  return (
    <header id="header">
      <HeaderInfo />
      <CountDown />
      <Menue menus={menus} />
    </header>
  );
};
export default Header;
