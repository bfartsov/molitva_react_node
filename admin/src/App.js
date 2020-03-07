import React, { Fragment, useEffect, useState } from "react";

import Header from "./commponents/header/header";
import Footer from "./commponents/footer/footer";

import { PrivateRoute } from "./commponents/auth/privateRoute";
//Redux

import HomePage from "./commponents/pages/home/homePage";
import LoginPage from "./commponents/pages/login/loginPage";
import VideoPage from "./commponents/pages/videos/videoPage";
import BannerPage from "./commponents/pages/banners/bannerPage";
import EventPage from "./commponents/pages/events/eventPage";
import NewsPage from "./commponents/pages/news/newsPage";
import LivePage from "./commponents/pages/live/livePage";
import Edit from "./commponents/edit/editPage";
import Alert from './commponents/alert';
import {loadUser} from './redux/actions/auth';

import { Route } from "react-router-dom";

import "./css/style-responsive.css";
import "./css/table-responsive.css";
import "./css//App.css";


function App() {
  

  return (
    <Fragment>
      <Header />
      <Alert/>
      <Route exact path={"/login"} component={LoginPage} />
      <Route exact path="/" component={HomePage}  />
      <Route exact path="/videos" component={VideoPage} />
      <Route
        exact
        path="/videos/edit/:id"
        component={Edit}
        
      />
      <Route exact path="/banners" component={BannerPage}  />
      <Route
        exact
        path="/banners/edit/:id"
        component={Edit}
        
      />
      <Route exact path="/events" component={EventPage}  />
      <Route
        exact
        path="/events/edit/:id"
        component={Edit}
        
      />
      <Route exact path="/news" component={NewsPage}  />
      <Route exact path="/news/edit/:id" component={Edit}  />
      <Route exact path="/live" component={LivePage}  />
      <Route exact path="/live/edit/:id" component={Edit}  />

      <Footer />
    </Fragment>
  );
}

export default App;
