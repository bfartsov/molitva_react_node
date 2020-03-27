import React, { useState } from "react";
import { connect } from "react-redux";
import {saveBanner} from '../../../redux/actions/banners'
import Alert from '../../alert'



import Buttons from "../../edit/button";
const AddBanner = ({ history, saveBanner}) => {
  const [formData, setFormData] = useState({
    title:  "",
    img:  "",
    eventDate:  "",
  });




  const handnleSave = e => {
    e.preventDefault();
    saveBanner(formData, history)
    
  };

  const onChange = e =>  setFormData({ ...formData, [e.target.name]:e.target.value });
  const handleCancel = () => history.push('/banners');

  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Add Banner
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <Alert/>
              </h4>
             
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={e=>onChange(e)}
                        type="text"
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
                          size="16"
                          name='eventDate'
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

                  <Buttons handnleSave={handnleSave} handleCancel={handleCancel} />
                </form>
            
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default connect(null, {saveBanner})(AddBanner);
