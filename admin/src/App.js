import React, { Fragment } from "react";

import Header from "./commponents/header/header";
import Footer from "./commponents/footer/footer";
import HomePage from "./commponents/pages/home/homePage";
import { Route, Redirect } from "react-router-dom";

import "./css/style-responsive.css";
import "./css/table-responsive.css";
import "./css//App.css";

function App() {
  return (
    <Fragment>
      <Header />
      <HomePage />
      <Footer />
    </Fragment>
  );
}

export default App;
