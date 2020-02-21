import React, { useEffect, useState } from "react";
import { fetchData } from "../../../utils/helpers";
import Table from "../../table";
import "../../../css/table-responsive.css";

function EventPage() {
  const [events, setEvents] = useState("");
  useEffect(() => {
    fetchData("http://localhost:8080/api/events", setEvents);
  }, []);
  let title = {};
  let items = [];
  if (events.length > 0) {
    events.map(event => {
      const item = {
        id: event._id,
        title: event.title,
        description: event.description,
        img: event.img,
        date: event.date,
        place: event.place,
        start: event.startTime,
        end: event.endTime,
        city: event.city,
        region: event.region
      };
      items.push(item);
    });
  }
  items.length > 0 ? (title = Object.keys(items[0])) : (title = {});
  const handleDelete = e => {
    e.preventDefault();
  };
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> events
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <i className="fa fa-angle-right"></i> Responsive Table
              </h4>
              <section id="unseen">
                {events && (
                  <Table
                    titles={title}
                    items={items}
                    handleDelete={handleDelete}
                  />
                )}
              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default EventPage;
