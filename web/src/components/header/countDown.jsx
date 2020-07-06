import React from "react";
import logo from "../../images/logo.png";

class CountDown extends React.Component {
  render() {
    return (
      <section className="logo-row">
        <div className="container">
          <strong className="logo">
            <a href="/">
              <img src={logo} alt="logo" />
            </a>
          </strong>
          <div className="event-timer">
            <strong className="title">Следваща молитва</strong>
            <div
              className="countdown countdown-container"
              data-border-color="rgba(255, 255, 255,1)"
            >
              <div className="clock">
                <div className="clock-item clock-days countdown-time-value">
                  <div className="wrap">
                    <div className="inner">
                      <div id="canvas-days" className="clock-canvas"></div>
                      <div className="text">
                        <p className="val">0</p>
                      </div>
                    </div>
                  </div>
                  <span className="colun-1">:</span>
                </div>
                <div className="clock-item clock-hours countdown-time-value">
                  <div className="wrap">
                    <div className="inner">
                      <div id="canvas-hours" className="clock-canvas"></div>
                      <div className="text">
                        <p className="val">0</p>
                      </div>
                    </div>
                  </div>
                  <span className="colun-2">:</span>
                </div>
                <div className="clock-item clock-minutes countdown-time-value">
                  <div className="wrap">
                    <div className="inner">
                      <div id="canvas-minutes" className="clock-canvas"></div>
                      <div className="text">
                        <p className="val">0</p>
                      </div>
                    </div>
                  </div>
                  <span className="colun-3">:</span>
                </div>
                <div className="clock-item clock-seconds countdown-time-value">
                  <div className="wrap">
                    <div className="inner">
                      <div id="canvas-seconds" className="clock-canvas"></div>
                      <div className="text">
                        <p className="val">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CountDown;
