import React, { useState, useEffect } from "react";
import Alert from "../../alert";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { connect } from "react-redux";
import { savePrayer } from "../../../redux/actions/prayers";

import Buttons from "../../edit/button";
const AddPrayer = ({ match, savePrayer, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    video: "",
    img: "",
    text: "",
    year: null,
  });

  console.log(formData);

  const handnleSave = (e) => {
    e.preventDefault();

    savePrayer(formData, history);
  };
  const handleCancel = () => history.push("/prayers");

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    // !editLoading?  history.push('/videos'):
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Prayer
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
                    Text
                  </label>
                  <div className="col-sm-10">
                    <CKEditor
                      name="text"
                      editor={ClassicEditor}
                      data={formData.text}
                      onInit={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const text = editor.getData();
                        setFormData({ ...formData, text });
                      }}
                      onBlur={(event, editor) => {
                        const data = editor.getData();
                      }}
                      onFocus={(event, editor) => {
                        const data = editor.getData();
                      }}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">
                    Video URL
                  </label>
                  <div className="col-sm-10">
                    <input
                      onChange={(e) => onChange(e)}
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
                      onChange={(e) =>
                        setFormData({ ...formData, img: e.target.files[0] })
                      }
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
                        onChange={(e) => onChange(e)}
                        type="number"
                        min="2017"
                        name="year"
                        defaultValue={formData.year}
                        className="form-control"
                      />
                      <span className="input-group-btn add-on">
                        <button className="btn btn-theme" type="button">
                          <i className="fa fa-calendar"></i>
                        </button>
                      </span>
                    </div>
                    <span className="help-block">Select year</span>
                  </div>
                </div>

                <Buttons
                  handnleSave={handnleSave}
                  handleCancel={handleCancel}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default connect(null, { savePrayer })(AddPrayer);