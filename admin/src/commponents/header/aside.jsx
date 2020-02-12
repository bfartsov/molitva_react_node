import React from "react";

const Aside = () => {
  return (
    <aside>
      <div id="sidebar" className="nav-collapse ">
        <ul className="sidebar-menu" id="nav-accordion">
          <li className="mt">
            <a href="index.html">
              <i className="fa fa-dashboard"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li className="sub-menu">
            <a href="/videos">
              <i className="fa fa-desktop"></i>
              <span>Videos</span>
            </a>
          </li>
          <li className="sub-menu">
            <a href="javascript:;">
              <i className="fa fa-cogs"></i>
              <span>Banners</span>
            </a>
          </li>
          <li className="sub-menu">
            <a className="active" href="javascript:;">
              <i className="fa fa-book"></i>
              <span>Events</span>
            </a>
          </li>
          <li className="sub-menu">
            <a href="javascript:;">
              <i className="fa fa-tasks"></i>
              <span>News</span>
            </a>
          </li>
          <li className="sub-menu">
            <a href="javascript:;">
              <i className="fa fa-th"></i>
              <span>Live</span>
            </a>
          </li>
          <li className="sub-menu">
            <a href="javascript:;">
              <i className="fa fa-th"></i>
              <span>Timer</span>
            </a>
          </li>
          <li className="sub-menu">
            <a href="javascript:;">
              <i className="fa fa-th"></i>
              <span>Menus</span>
            </a>
          </li>
          <li className="sub-menu">
            <a href="javascript:;">
              <i className="fa fa-comments-o"></i>
              <span>National Prayers</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
