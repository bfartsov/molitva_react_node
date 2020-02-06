import React, { useState } from "react";
import menuData from "../../data/menues";
import MenuItem from "./menuItem";
import ".././../css/bootstrap.css";

const Menue = () => {
  const [menues] = useState(menuData);

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
                  {menues.map(menu => {
                    return (
                      <MenuItem
                        key={menu.id}
                        title={menu.title}
                        children={menu.children}
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
