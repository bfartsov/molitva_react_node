import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getLive } from "../../../redux/actions/live";
import "../../../css/table-responsive.css";

const LivePage = ({ getLive, loading, live, history, location }) => {
  useEffect(() => {
    getLive()
  }, []);
  const handleDelete = e => {

  };

  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Live
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
              </h4>
              <section id="unseen">
                <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Id</th>
                      <th> Url</th>

                      <th> Type</th>
                      <th> Player</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading &&
                      (
                        <tr >
                          <td> {live._id}</td>
                          <td> {live.url}</td>
                          <td> {live.type}</td>
                          <td> {live.player}</td>

                          <td>
                            <button
                              onClick={() => {
                                history.push(
                                  `${location.pathname}/edit/${live._id}`
                                );
                              }}
                              className="btn btn-primary btn-xs"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              id={live._id}
                              onClick={() => handleDelete(live._id)}
                              className="btn remove btn-danger btn-xs"
                            >
                              <i className="fa fa-trash-o "></i>
                            </button>
                          </td>
                        </tr>

                      )}
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
const mapStateToProps = state => ({
  live: state.live.live,
  loading: state.live.loading
});
export default connect(mapStateToProps, { getLive })(LivePage);
