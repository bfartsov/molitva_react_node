import React, { useState } from "react";
import Alert from '../../alert'

import { connect } from "react-redux";
import {saveVideo} from '../../../redux/actions/videos'



import Buttons from "../../edit/button";
const EditVIdeo = ({saveVideo, history }) => {


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video: "",
    img: "",
    dateCreated: "",
    feature: []
  });


console.log(formData)

  const handnleSave = e => {
    e.preventDefault();
    saveVideo(formData, history)
  };
  const handleCancel = () => history.push('/videos');

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Add Video
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <Alert />
              </h4>

              <form className="form-horizontal style-form">
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">
                    Title
                    </label>
                  <div className="col-sm-10">
                    <input
                      onChange={e => onChange(e)}
                      type="text"
                      defaultValue={formData.title}
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
                      defaultValue={formData.description}
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
                      defaultValue={formData.video}
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
                      onChange={e => setFormData({ ...formData, img: e.target.files[0] })}
                      type="file"
                      name="img"
                      className="default"
                    />
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
                      className="input-append date dpYears"
                    >
                      <input
                        onChange={e => onChange(e)}
                        type="date"
                        name="dateCreated"
                        defaultValue={formData.dateCreated}
                        size="16"
                        className="form-control"
                      />
                      <span className="input-group-btn add-on">
                        <button className="btn btn-theme" type="button">
                          <i className="fa fa-calendar"></i>
                        </button>
                      </span>
                    </div>
                    <span className="help-block">Select date</span>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">
                    Featured
                    </label>
                  <div className="col-sm-10">
                    <select
                      onChange={e => {
                        var options = e.target.options;
                        var value = [];
                        for (var i = 0, l = options.length; i < l; i++) {
                          if (options[i].selected) {
                            value.push(options[i].value);
                          }
                        }
                        setFormData({ ...formData, feature: value })
                      }}
                      name="feature"
                      className="form-control"
                      multiple
                    >
                      <option value="HomePage">Home</option>
                      <option value="VideoPage">Video</option>
                    </select>
                  </div>
                </div>
                <Buttons handnleSave={handnleSave} handleCancel={handleCancel} />
              </form>

            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default connect(null, {saveVideo})(EditVIdeo);