import React from "react";
import MenuItem from "./menuItem";
import ".././../css/bootstrap.css";

const Menue = ({ menus }) => {
  return (
    <section className="navigation-row">
      <div className="container">
        <div role="navigation" className="navbar-inverse">
          <div className="container">
            <div className="navbar-header">
              <button
                data-target=".navbar-collapse"
                data-toggle="collapse"
                className="navbar-toggle"
                type="button"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse">
              <nav>
                <ul id="nav">
                  {menus.length > 0 &&
                    menus.map(menu => {
                      return (
                        <MenuItem
                          key={menu._id}
                          title={menu.name}
                          children={menu.subMenu}
                          url={menu.url}
                        ></MenuItem>
                      );
                    })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Menue;
