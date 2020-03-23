import React, { Fragment, useEffect } from "react";

import Header from "./commponents/header/header";
import Footer from "./commponents/footer/footer";

import PrivateRoute from "./commponents/auth/privateRoute";
//Redux
import { connect } from "react-redux";

import HomePage from "./commponents/pages/home/homePage";
import LoginPage from "./commponents/pages/login/loginPage";
import VideoPage from "./commponents/pages/videos/videoPage";
import EditVIdeo from "./commponents/pages/videos/videoEdit";
import EditBanner from "./commponents/pages/banners/banerEdit";


import BannerPage from "./commponents/pages/banners/bannerPage";

import EventPage from "./commponents/pages/events/eventPage";
import EditEvent from "./commponents/pages/events/eventEdit";

import NewsPage from "./commponents/pages/news/newsPage";
import EditNews from "./commponents/pages/news/newsEdit";

import LivePage from "./commponents/pages/live/livePage";
import EditLIve from "./commponents/pages/live/liveEdit";

import MenuPage from "./commponents/pages/menus/menuPage";
import EditMenu from "./commponents/pages/menus/menuEdit";
import SubMenuedit from "./commponents/pages/menus/subMenuEdit";




import Edit from "./commponents/edit/editPage";
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

        <PrivateRoute exact path="/videos/edit/:id" component={EditVIdeo} />
        <PrivateRoute exact path="/banners" component={BannerPage} />
        <PrivateRoute exact path="/banners/edit/:id" component={EditBanner} />
        <PrivateRoute exact path="/events" component={EventPage} />
        <PrivateRoute exact path="/events/edit/:id" component={EditEvent} />
        <PrivateRoute exact path="/news" component={NewsPage} />
        <PrivateRoute exact path="/news/edit/:id" component={EditNews} />
        <PrivateRoute exact path="/live" component={LivePage} />
        <PrivateRoute exact path="/live/edit/:id" component={EditLIve} />
        <PrivateRoute exact path="/menus" component={MenuPage} />
        <PrivateRoute exact path="/menus/edit/:id" component={EditMenu} />
        <PrivateRoute exact path="/menus/edit/:id/subMenu/:subMenu" component={SubMenuedit} />



      </Switch>
      <Footer />
    </Fragment>
  );
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { loadUser })(App);
