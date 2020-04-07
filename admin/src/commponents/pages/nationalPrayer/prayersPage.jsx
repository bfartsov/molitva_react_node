import React, { useEffect } from "react";
import Alert from "../../alert";
import { connect } from "react-redux";
import { getPrayers } from "../../../redux/actions/prayers";

import "../../../css/table-responsive.css";

const PrayersPage = ({ getPrayers, prayers, loading, history, location }) => {
  useEffect(() => {
    getPrayers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = (id) => {};

  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Prayers
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
                  onClick={() => history.push("/prayers/add")}
                >
                  Add Prayer
                </button>
                <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Title</th>
                      <th> year</th>
                      <th> Video</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prayers.length > 0 &&
                      prayers.map((item) => {
                        return (
                          <tr key={item._id}>
                            <td> {item.title}</td>
                            <td> {item.year}</td>
                            <td> {item.video}</td>
                            <td>
                              <button
                                onClick={() => {
                                  history.push(
                                    `${location.pathname}/edit/${item._id}`
                                  );
                                }}
                                className="btn btn-primary btn-xs"
                              >
                                <i className="fa fa-pencil"></i>
                              </button>
                              <button
                                id={item._id}
                                onClick={() => handleDelete(item._id)}
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
  prayers: state.prayers.prayers,
  loading: state.prayers.loading,
});
export default connect(mapStateToProps, { getPrayers })(PrayersPage);
