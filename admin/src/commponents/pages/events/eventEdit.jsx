import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { save } from "../../../redux/actions/save";
import Alert from "../../alert";

import Buttons from "../../edit/button";
const EditEvent = ({ match, edit, event, save, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    region: "",
    city: "",
    description: "",
    img: "",
  });
  useEffect(() => {
    edit("events", match.params.id);
    setFormData({
      title: event.title ? event.title : "",
      location: event.location ? event.location : "",
      date: event.date ? event.date : "",
      startTime: event.startTime ? event.startTime : "",
      endTime: event.endTime ? event.endTime : "",
      region: event.region ? event.region : "",
      city: event.city ? event.city : "",
      description: event.description ? event.description : "",
      img: event.img ? event.img : "",
    });
  }, [event.loading]);

  const handnleSave = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/api/events/${match.params.id}`;
    save(url, formData, history, "/events");
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCancel = () => history.push("/events");

  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Events
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <Alert />
              </h4>
              {event && !event.loading && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        defaultValue={event.title}
                        name="title"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      location
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        defaultValue={event.location}
                        name="location"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Date
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="date"
                        defaultValue={event.date}
                        name="date"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Staret Time
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="time"
                        defaultValue={event.startTime}
                        name="startTime"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      End TIme
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="time"
                        defaultValue={event.endTime}
                        name="endTime"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Region
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        defaultValue={event.region}
                        name="region"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      City
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        defaultValue={event.city}
                        name="city"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Description
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        defaultValue={event.description}
                        name="description"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Image
                    </label>
                    <div className="col-md-4">
                      <input
                        onChange={(e) =>
                          setFormData({ ...formData, img: e.target.files[0] })
                        }
                        type="file"
                        name="img"
                        className="default"
                      />
                    </div>
                  </div>

                  <Buttons
                    handleCancel={handleCancel}
                    handnleSave={handnleSave}
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
const mapStateToProps = (state) => ({
  event: state.edit,
});
export default connect(mapStateToProps, { edit, save })(EditEvent);
