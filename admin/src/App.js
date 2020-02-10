import React from "react";

import Header from "./commponents/header/header";
import Footer from "./commponents/footer/footer";
import HomePage from "./commponents/pages/home/homePage";

import "./css/style-responsive.css";
import "./css/table-responsive.css";
import "./css//App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
