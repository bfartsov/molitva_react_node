import React, { useState, useEffect } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { save } from "../../../redux/actions/save";


import Buttons from "../../edit/button";
const EditNews = ({ match, edit, news, save }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    img: '',
    link: '',
    date: ''
  });

  useEffect(() => {
    edit("news", match.params.id);
    setFormData({
      text: news.loading || news.title ? news.title : '',
      text: news.loading || news.text ? news.text : '',
      img: news.loading || news.img ? news.img : '',
      link: news.loading || news.link ? news.link : '',
      date: news.loading || news.date ? news.date : ''
    })

  }, [news.loading]);
  console.log(formData)

  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/news/${match.params.id}`;
    //save(url, names);
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <i className="fa fa-angle-right"></i> Form Elements
              </h4>
              {!news.loading && news && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Title
                    </label>
                    <div className="col-sm-10">
                      <input
                        type="text"
                        defaultValue={news.title}
                        name="title"
                        className="form-control"
                        onChange={e => onChange(e)}

                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Text
                    </label>
                    <div className="col-sm-10">
                      <CKEditor
                        name='text'
                        editor={ClassicEditor}
                        data={news.text}
                        onInit={editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                          const text = editor.getData();
                          setFormData({ ...formData, text })

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
                      Link
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={e => onChange(e)}
                        type="text"
                        name="link"
                        value={news.link}
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
                        onChange={e => {
                          setFormData({ ...formData, img: e.target.files[0] })
                        }}
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
                          defaultValue={news.date}
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
  news: state.edit
});
export default connect(mapStateToProps, { edit, save })(EditNews);
