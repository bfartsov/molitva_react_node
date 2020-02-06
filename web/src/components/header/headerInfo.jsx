import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
const HeaderInfo = () => {
  return (
    <section className="head-topbar">
      <div className="container holder">
        <div className="left">
          <a href="mailto:" className="email">
            <i className="fa fa-envelope"></i>info@molitvabg.org
          </a>
        </div>
        <div className="right">
          <ul className="topbar-social">
            <li>
              <a href="https://www.facebook.com/molitvabg/">
                <FontAwesomeIcon
                  className="fa fa-thumbs-o-up"
                  icon={faFacebookF}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
export default HeaderInfo;
