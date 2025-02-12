import React, { useEffect, useState } from "react";
import Alert from "../../alert";
import { connect } from "react-redux";
import { getEvents, removeEvent } from "../../../redux/actions/events";
import "../../../css/table-responsive.css";

const EventPage = ({
  events,
  getEvents,
  loading,
  history,
  removeEvent,
  location,
}) => {
  useEffect(() => {
    getEvents();
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    removeEvent(id);
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
                <Alert />
              </h4>
              <section id="unseen">
                <button
                  className="btn btn-theme"
                  onClick={() => history.push("/events/add")}
                >
                  Add Event
                </button>
                <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Title</th>
                      <th> Location</th>
                      <th> Date</th>
                      <th> Start</th>
                      <th> End</th>
                      <th> Region</th>
                      <th> City</th>

                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.length > 0 &&
                      !loading &&
                      events.map((event) => {
                        return (
                          <tr key={event._id}>
                            <td> {event.title}</td>
                            <td> {event.location}</td>
                            <td> {event.date}</td>
                            <td> {event.startTime}</td>
                            <td> {event.endTime}</td>
                            <td> {event.region}</td>
                            <td> {event.city}</td>
                            <td>
                              <button
                                onClick={() => {
                                  history.push(
                                    `${location.pathname}/edit/${event._id}`
                                  );
                                }}
                                className="btn btn-primary btn-xs"
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button
                                id={event._id}
                                onClick={() => handleDelete(event._id)}
                                className="btn remove btn-danger btn-xs"
                              >
                                <i className="fa fa-trash-o "></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
const mapStateToProps = (state) => ({
  events: state.events.events,
  loading: state.events.loading,
});
export default connect(mapStateToProps, { getEvents, removeEvent })(EventPage);
