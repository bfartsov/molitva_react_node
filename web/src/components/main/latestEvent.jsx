import React from "react";
import Event from "../events/event";
const LatestEvents = ({ events }) => {
  return (
    <section className="latest-event">
      <div className="container">
        <h3>Събития</h3>
        <div className="row">
          {events.length > 0 &&
            events.map((event) => {
              return (
                <div className="col-md-3 col-sm-6" key={event._id}>
                  <Event
                    img={event.img}
                    title={event.title}
                    startTime={event.startTime}
                    endTime={event.endTime}
                    place={event.place}
                    city={event.city}
                    description={event.description}
                    date={event.date}
                    shortDate={event.shortDate}
                  />
                </div>
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
