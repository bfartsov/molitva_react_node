import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { saveEvent } from "../../../redux/actions/events";

import Buttons from "../../edit/button";
const AddEvent = ({ match, saveEvent, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    place: "",
    date: "",
    startTime: "",
    endTime: "",
    reagion: "",
    city: "",
    description: "",
    img: "",
  });

  const handnleSave = (e) => {
    e.preventDefault();
    saveEvent(formData, history);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Events
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb"></h4>

              <form className="form-horizontal style-form">
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">
                    Title
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={(e) => onChange(e)}
                      type="text"
                      defaultValue={formData.title}
                      name="title"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">
                    Place
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={(e) => onChange(e)}
                      type="text"
                      defaultValue={formData.place}
                      name="place"
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
                      defaultValue={formData.date}
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
                      defaultValue={formData.startTime}
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
                      defaultValue={formData.endTime}
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
                      defaultValue={formData.region}
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
                      defaultValue={formData.city}
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
                      defaultValue={formData.description}
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

                <Buttons handnleSave={(e) => handnleSave(e)} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default connect(null, { saveEvent })(AddEvent);
