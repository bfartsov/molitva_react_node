import React, { useState, useEffect } from "react";
import { fetchData } from "../../../utils/helpers";
import PageTitle from "../../main/pageTittle";
import Event from "../../events/event";
import img from "../../../images/0233622001395215466_20118_600x458.jpg";

const EventPage = ({ match: { params } }) => {
  const [events, setEvents] = useState("");

  useEffect(() => {
    fetchData(`http://localhost:8080/api/events`, setEvents, "events");
  }, []);
  console.log(events);
  return (
    <div id="main">
      <PageTitle title={"Предстоящи събития"} />

      <section class="event-grid">
        <div class="container">
          <div class="row">
            <div>
              <ul class="row">
                {events.length > 0 &&
                  events.map(event => {
                    return (
                      <li class="col-md-3 col-sm-5">
                        <Event
                          img={img}
                          title={event.title}
                          startTime={event.startTime}
                          endTime={event.endTime}
                          place={event.place}
                          city={event.city}
                          description={event.description}
                          date={event.date}
                          shortDate={event.shortD}
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

export default EventPage;
