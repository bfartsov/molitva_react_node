import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { save } from "../../../redux/actions/save";

import Buttons from "../../edit/button";
const EditVIdeo = ({ match, edit, video, save }) => {
  useEffect(() => {
    edit("videos", match.params.id);
  }, []);
  const defautValue = {
    title: video.ttile,
    description: video.description,
    video: video.video
  };
  const [names, setName] = useState(defautValue);

  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/videos/${match.params.id}`;
    console.log(names);
    //save(url, names);
  };

  const onChange = e => {
    let name = e.target.name;
    const value = name === "img" ? e.target.files[0] : e.target.value;

    const newItem = {};

    newItem[name] = value;
    setName({ ...names, ...newItem });
  };
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
              {video && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={onChange}
                        type="text"
                        defaultValue={video.title}
                        name="title"
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
                        name="description"
                        value={video.description}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Video URL
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={e => onChange(e)}
                        type="text"
                        name="video"
                        value={video.video}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div class="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Image
                    </label>
                    <div class="col-md-4">
                      <input type="file" class="default" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Date
                    </label>
                    <div className="col-sm-9">
                      <div
                        data-date-viewmode="years"
                        data-date-format="dd-mm-yyyy"
                        data-date="01-01-2014"
                        class="input-append date dpYears"
                      >
                        <input
                          onChange={e => onChange(e)}
                          type="date"
                          value={video.dateCreated}
                          size="16"
                          class="form-control"
                        />
                        <span class="input-group-btn add-on">
                          <button class="btn btn-theme" type="button">
                            <i class="fa fa-calendar"></i>
                          </button>
                        </span>
                      </div>
                      <span class="help-block">Select date</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Featured
                    </label>
                    <div className="col-sm-10">
                      <select
                        onChange={e => onChange(e)}
                        name="feature"
                        className="form-control"
                        multiple
                      >
                        <option value="HomePage">Home</option>
                        <option value="VideoPage">Video</option>
                      </select>
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
  video: state.edit
});
export default connect(mapStateToProps, { edit, save })(EditVIdeo);
