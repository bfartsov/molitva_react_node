import React, { useState, useEffect } from "react";
import moment from 'moment'
import Alert from '../../alert'
import { connect } from "react-redux";
import { getTimer } from "../../../redux/actions/timer";

import { } from "../../../redux/actions/news";
import "../../../css/table-responsive.css";
import Buttons from "../../edit/button";


const NewsPage = ({ getTimer, timer, loading }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: ''
  })
  useEffect(() => {
    getTimer()
    setFormData({
      date: timer.date ? moment().format(timer.date) : '',
      time: timer.time ? timer.time : '',
    })

  }, [loading]);
  console.log(formData)
console.log(moment().format(timer.date))
  const handnleSave = () => { }

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> news
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <Alert />
              </h4>
              <section id="unseen">
                {!loading && <form action="#" className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="control-label col-md-3">Date</label>
                    <div className="col-md-3 col-xs-11">
                      <input onChange={e => onChange(e)} className="form-control form-control-inline input-medium default-date-picker"  type="date" name="date" value={formData.date} />
                      <span className="help-block">Select date</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="control-label col-md-3">Time</label>
                    <div className="col-md-3 col-xs-11">
                      <input onChange={e => onChange(e)} className="form-control form-control-inline input-medium default-date-picker"  name="time" type="time" defaultValue={formData.time}/>
                      <span className="help-block">Select time</span>
                    </div>
                  </div>
                  <Buttons handnleSave={handnleSave} />

                </form>}

              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
const mapStateToProps = state => ({
  timer: state.timer.timer,
  loading: state.timer.loading
});

export default connect(mapStateToProps, { getTimer })(NewsPage);
