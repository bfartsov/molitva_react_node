import React from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";

const TopBar = ({ logout, isAuthenticated }) => {
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
              <div className="logout" onClick={logout}>
                Logout
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
const mapPropsToState = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapPropsToState, { logout })(TopBar);
