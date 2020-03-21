import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { save } from "../../../redux/actions/save";

import Buttons from "../../edit/button";
const EditEvent = ({ match, edit, event, save }) => {
  const [formData, setFormData] = useState({
    titile: '',
    place: '',
    date: '',
    startTime: '',
    endTime: '',
    reagion: '',
    city: '',
    description: '',
    img: ''
  });
  useEffect(() => {
    edit("events", match.params.id);
    setFormData({
      titile: event.title ? event.title : '',
      place: event.place ? event.place : '',
      date: event.date ? event.date : '',
      startTime: event.startTime ? event.startTime : '',
      endTime: event.endTime ? event.endTime : '',
      reagion: event.region ? event.region : '',
      city: event.city ? event.city : '',
      description: event.description? event.description: '',
      img: event.img ? event.img : ''
    })
  }, [event.loading]);



  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/events/${match.params.id}`;
    //save(url, names);
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log(formData)
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
              </h4>
              {event && !event.loading && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={e => onChange(e)}
                        type="text"
                        defaultValue={event.title}
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
                        onChange={e => onChange(e)}
                        type="text"
                        defaultValue={event.place}
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
                        onChange={e => onChange(e)}
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
                        onChange={e => onChange(e)}
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
                        onChange={e => onChange(e)}
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
                        onChange={e => onChange(e)}
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
                        onChange={e => onChange(e)}
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
                        onChange={e => onChange(e)}
                        type="text"
                        defaultValue={event.desciption}
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
                        onChange={e => onChange(e)}
                        type="file"
                        name="img"
                        className="default"
                      />
                    </div>
                  </div>


                  <Buttons handnleSave={handnleSave} />
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
const mapStateToProps = state => ({
  event: state.edit
});
export default connect(mapStateToProps, { edit, save })(EditEvent);
