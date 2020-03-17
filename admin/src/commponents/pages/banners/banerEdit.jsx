import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { save } from "../../../redux/actions/save";

import Buttons from "../../edit/button";
const EditBanner = ({ match, edit, banner, save }) => {
  useEffect(() => {
    edit("banners", match.params.id);
  }, []);

  const [names, setName] = useState({
    title: banner.ttile || "",
    img: banner.banner || "",
    eventDate: banner.eventDate || "",
  });

  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/banners/${match.params.id}`;
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
  console.log(names);
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
              {banner && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={onChange}
                        type="text"
                        value={banner.title}
                        // defaultValue={video.title}
                        name="title"
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
                          value={banner.eventDate}
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
  banner: state.edit
});
export default connect(mapStateToProps, { edit, save })(EditBanner);
