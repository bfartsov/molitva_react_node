import React, { useEffect, useState } from "react";
import Alert from '../../alert'
import { connect } from "react-redux";
import { getEvents } from "../../../redux/actions/events";
import "../../../css/table-responsive.css";

const  EventPage=({events, getEvents, loading,  history, location})=> {
  useEffect(() => {
    getEvents()
  }, []);
  
  const handleDelete = e => {
    e.preventDefault();
  };
  console.log(events)
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
              <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Id</th>
                      <th> Title</th>
                     
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.length>0 && !loading && events.map(event => {
                      return (
                        <tr key={event._id}>
                          <td> {event._id}</td>
                          <td> {event.title}</td>
                          
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
                              onClick={()=>handleDelete(event._id)}
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
}
const mapStateToProps = state=>({
  events: state.events.events,
  loading: state.events.loading
});
export default connect(mapStateToProps, {getEvents})(EventPage);
