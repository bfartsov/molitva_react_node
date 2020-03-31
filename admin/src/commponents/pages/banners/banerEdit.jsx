import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Alert from '../../alert'

import { edit } from "../../../redux/actions/edit";
import { save } from "../../../redux/actions/save";

import Buttons from "../../edit/button";
const EditBanner = ({ match, edit, banner, save, history }) => {
  const [formData, setFormData] = useState({
    title: "",
    img: "",
    eventDate: "",
  });
  useEffect(() => {
    edit("banners", match.params.id);
    setFormData({
      title: !banner.loading && banner ? banner.title : "",
      img: !banner.loading && banner ? banner.banner : "",
      eventDate: !banner.loading && banner ? banner.eventDate : ""
    })
  }, [banner.loading]);



  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/banners/${match.params.id}`;

    save(url, formData, history, '/banners');
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCancel = ()=> history.push('/banners');

  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Edit Banner
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <Alert />
              </h4>
              {banner && !banner.loading && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={e => onChange(e)}
                        type="text"
                        defaultValue={banner.title}
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

                        className="input-append date dpYears"
                      >
                        <input
                          onChange={e => onChange(e)}
                          type="date"
                          name="eventDate"
                          defaultValue={banner.eventDate}
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

                  <Buttons handleCancel={handleCancel} handnleSave={handnleSave} />
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
