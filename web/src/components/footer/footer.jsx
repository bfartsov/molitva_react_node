import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {
  return (
    <footer id="footer">
      <section className="footer-social">
        <div className="container">
          <ul>
            <li>
              <a
                href="https://www.facebook.com/molitvabg/"
                className="social-color-1"
              >
                <FontAwesomeIcon
                  className="fa fa-facebook"
                  icon={faFacebookF}
                />
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="copyrights-section">
        <div className="container">
          <strong className="copy">
            <span className="bold">Общо молитвено движение и братолюбие</span>
            &copy; 2017, Всички права запазени,{" "}
          </strong>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
