import React, { Fragment, useEffect, useState } from "react";

import Header from "./commponents/header/header";
import Footer from "./commponents/footer/footer";

import HomePage from "./commponents/pages/home/homePage";
import LoginPage from "./commponents/pages/login/loginPage";
import { Route } from "react-router-dom";

import "./css/style-responsive.css";
import "./css/table-responsive.css";
import "./css//App.css";

function App() {
  //
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    localStorage.getItem("user") ? setLoggedIn(true) : setLoggedIn(false);
  }, []);
  console.log(loggedIn);
  return (
    <Fragment>
      {loggedIn && <Header />}
      <Route exact path={"/login"} component={LoginPage} />
      <Footer />
    </Fragment>
  );
}

export default App;
