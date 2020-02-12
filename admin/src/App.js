import React, { Fragment, useEffect, useState } from "react";

import Header from "./commponents/header/header";
import Footer from "./commponents/footer/footer";
import { PrivateRoute } from "./commponents/auth/privateRoute";

import HomePage from "./commponents/pages/home/homePage";
import LoginPage from "./commponents/pages/login/loginPage";
import VideoPage from "./commponents/pages/videos/videoPage";
import { Route } from "react-router-dom";

import "./css/style-responsive.css";
import "./css/table-responsive.css";
import "./css//App.css";

function App() {
  //
  const [loggedIn, setLoggedIn] = useState(true);
  useEffect(() => {
    localStorage.getItem("user") ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  return (
    <Fragment>
      <Header />
      <Route exact path={"/login"} component={LoginPage} />
      <PrivateRoute exact path="/" component={HomePage} loggedin={loggedIn} />
      <Route exact path="/videos" component={VideoPage} loggedIn={loggedIn} />

      <Footer />
    </Fragment>
  );
}

export default App;
