import React from "react";
import "./App.css";
import HomePage from "./components/pages/home/homePage";
import AboutPage from "./components/pages/about/about";
import CausePage from "./components/pages/about/causePage";
import MessagesPage from "./components/pages/about/messagesPage";
import ContactPage from "./components/pages/about/contactPage";
import LivePage from "./components/pages/live/livePage";
import VideoPage from "./components/pages/videos/videoPage";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/responsive.css";
import "./css/custom.css";
import "./css/color-2.css";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={"/"} component={HomePage} />
        <Route exact path={"/about"} component={AboutPage} />
        <Route exact path={"/cause"} component={CausePage} />
        <Route exact path={"/messages"} component={MessagesPage} />
        <Route exact path={"/contacts"} component={ContactPage} />
        <Route exact path={"/live"} component={LivePage} />
        <Route exact path={"/video/:year"} component={VideoPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
