import React from "react";

const TopBar = () => {
  return (
    <header className="header black-bg">
      <div className="sidebar-toggle-box">
        <div
          className="fa fa-bars tooltips"
          data-placement="right"
          data-original-title="Toggle Navigation"
        ></div>
      </div>

      <a href="index.html" className="logo">
        <b>
          Molitvabg<span>Admin</span>
        </b>
      </a>

      <div className="nav notify-row" id="top_menu">
        <div className="top-menu">
          <ul className="nav pull-right top-menu">
            <li>
              <a className="logout" href="login.html">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
