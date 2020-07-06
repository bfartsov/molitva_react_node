import React, { useState, useEffect } from "react";
import PageTitle from "../../main/pageTittle";
import Event from "../../events/event";

import { connect } from "react-redux";
import { getAllEvents } from "../../../redux/actions/events";

const EventPage = ({ events, getAllEvents }) => {
  useEffect(() => {
    getAllEvents();
  }, []);
  return (
    <div id="main">
      <PageTitle title={"Предстоящи събития"} />

      <section className="event-grid">
        <div className="container">
          <div className="row">
            <div className="container">
              <ul className="row">
                {events.length > 0 &&
                  events.map((event) => {
                    return (
                      <li key={event._id} className="col-md-3 col-sm-12">
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
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const mapStateToProps = (state) => ({
  events: state.events.events,
});
export default connect(mapStateToProps, { getAllEvents })(EventPage);
