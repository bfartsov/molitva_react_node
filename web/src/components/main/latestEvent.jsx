import React from "react";
import img from "../../images/0233622001395215466_20118_600x458.jpg";
import Event from "../events/event";
const LatestEvents = ({ events }) => {
  return (
    <section className="latest-event">
      <div className="container">
        <h3>Събития</h3>
        <div className="row">
          {events.length > 0 &&
            events.map(event => {
              return (
                <Event
                  key={event._id}
                  img={img}
                  title={event.title}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  place={event.place}
                  city={event.city}
                  description={event.description}
                  date={event.date}
                />
              );
            })}
        </div>
        <a href="events-2019.html" className="view-calender">
          Календар
        </a>
      </div>
    </section>
  );
};
export default LatestEvents;
