import React, { Fragment, useEffect } from "react";

import Header from "./commponents/header/header";
import Footer from "./commponents/footer/footer";

import PrivateRoute from "./commponents/auth/privateRoute";
//Redux
import { connect } from "react-redux";

import HomePage from "./commponents/pages/home/homePage";
import LoginPage from "./commponents/pages/login/loginPage";
import VideoPage from "./commponents/pages/videos/videoPage";
import BannerPage from "./commponents/pages/banners/bannerPage";
import EventPage from "./commponents/pages/events/eventPage";
import NewsPage from "./commponents/pages/news/newsPage";
import LivePage from "./commponents/pages/live/livePage";
import Edit from "./commponents/edit/editPage";
import Alert from "./commponents/alert";
import { loadUser } from "./redux/actions/auth";
import setAuthToken from "./utils/setAuthToken";

import { Route, Switch } from "react-router-dom";

import "./css/table-responsive.css";
import "./css//App.css";

import "./css/style-responsive.css";

const App = ({ loadUser, isAuthenticated }) => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    loadUser();
  }, []);

  return (
    <Fragment>
      {isAuthenticated && <Header />}
      <Switch>
        <Route exact path={"/login"} component={LoginPage} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/videos" component={VideoPage} />

        <PrivateRoute exact path="/videos/edit/:id" component={Edit} />
        <PrivateRoute exact path="/banners" component={BannerPage} />
        <PrivateRoute exact path="/banners/edit/:id" component={Edit} />
        <PrivateRoute exact path="/events" component={EventPage} />
        <PrivateRoute exact path="/events/edit/:id" component={Edit} />
        <PrivateRoute exact path="/news" component={NewsPage} />
        <PrivateRoute exact path="/news/edit/:id" component={Edit} />
        <PrivateRoute exact path="/live" component={LivePage} />
        <PrivateRoute exact path="/live/edit/:id" component={Edit} />
      </Switch>
      <Footer />
    </Fragment>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { loadUser })(App);
