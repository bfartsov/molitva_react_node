import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <CookiesProvider>
    <Router>
      <App />
    </Router>
  </CookiesProvider>,
  document.getElementById("container")
);
