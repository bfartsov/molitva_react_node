import React, { Fragment, useEffect, useState } from "react";

import Header from "./commponents/header/header";
import Footer from "./commponents/footer/footer";
import { PrivateRoute } from "./commponents/auth/privateRoute";

import HomePage from "./commponents/pages/home/homePage";
import LoginPage from "./commponents/pages/login/loginPage";
import VideoPage from "./commponents/pages/videos/videoPage";
import BannerPage from "./commponents/pages/banners/bannerPage";
import EventPage from "./commponents/pages/events/eventPage";
import NewsPage from "./commponents/pages/news/newsPage";
import LivePage from "./commponents/pages/live/livePage";
import Edit from "./commponents/edit/editPage";
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
      <Route exact path="/" component={HomePage} loggedin={loggedIn} />
      <Route exact path="/videos" component={VideoPage} loggedIn={loggedIn} />
      <Route
        exact
        path="/videos/edit/:id"
        component={Edit}
        loggedIn={loggedIn}
      />
      <Route exact path="/banners" component={BannerPage} loggedIn={loggedIn} />
      <Route
        exact
        path="/banners/edit/:id"
        component={Edit}
        loggedIn={loggedIn}
      />
      <Route exact path="/events" component={EventPage} loggedIn={loggedIn} />
      <Route
        exact
        path="/events/edit/:id"
        component={Edit}
        loggedIn={loggedIn}
      />
      <Route exact path="/news" component={NewsPage} loggedIn={loggedIn} />
      <Route exact path="/news/edit/:id" component={Edit} loggedIn={loggedIn} />
      <Route exact path="/live" component={LivePage} loggedIn={loggedIn} />
      <Route exact path="/live/edit/:id" component={Edit} loggedIn={loggedIn} />

      <Footer />
    </Fragment>
  );
}

export default App;
