import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { save } from "../../../redux/actions/save";

import Buttons from "../../edit/button";
const EditEvent = ({ match, edit, event, save }) => {
  useEffect(() => {
    edit("events", match.params.id);
  }, []);

  const [names, setName] = useState({
   
  });

  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/events/${match.params.id}`;
    //save(url, names);
  };

  const onChange = e => {
    e.preventDefault()
    let name = e.target.name;
    const value = name === "img" ? e.target.files[0] : e.target.value;

    const newItem = {};

    newItem[name] = value;
    setName({ ...names, ...newItem });
    
  };
  console.log(names)
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Form Components
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <i className="fa fa-angle-right"></i> Form Elements
              </h4>
              {event && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={e=>onChange(e)}
                        type="text"
                        value={event.title}
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
                       onChange={e=>onChange(e)}
                        type="text"
                        value={event.place}
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
                       onChange={e=>onChange(e)}
                        type="date"
                        value={event.date}
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
                         onChange={e=>onChange(e)}
                        type="time"
                        value={event.startTime}
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
                       onChange={e=>onChange(e)}
                        type="time"
                        value={event.endTime}
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
                         onChange={e=>onChange(e)}
                        type="text"
                        value={event.region}
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
                         onChange={e=>onChange(e)}
                        type="text"
                        value={event.city}
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
                        onChange={e=>onChange(e)}
                        type="text"
                        value={event.desciption}
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
