import React from "react";

const Event = ({
  shortDate,
  city,
  place,
  img,
  title,
  description,
  startTime,
  endTime,
  date
}) => {
  return (
    <div className="col-md-3 col-sm-6">
      <div className="latest-event-box">
        <div className="frame">
          <a href="/">
            <img src={img} alt="img" />
          </a>
          <div className="date">
            <strong className="dat">{shortDate}</strong>
          </div>
          <div className="caption">
            <h4>{city}</h4>
            <div className="text-box">
              <p>{description}</p>
            </div>
          </div>
          <div className="inner-area">
            <div className="timer-box">
              <div className=""></div>
            </div>
            <div className="text-area">
              <strong className="title">{title} </strong>
              <ul>
                <li>
                  <a href="/">
                    <span>
                      <i className="fa fa-user"></i>
                    </span>
                    <strong> {city}</strong>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <span>
                      <i className="fa fa-calendar"></i>
                    </span>
                    <strong>{date}</strong>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <span>
                      <i className="fa fa-map-marker"></i>
                    </span>
                    <strong>
                      {place}
                      <br />
                    </strong>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <span>
                      <i className="fa  fa-clock-o"></i>
                    </span>
                    <strong>
                      {startTime} - {endTime}
                      <br />
                    </strong>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Event;
