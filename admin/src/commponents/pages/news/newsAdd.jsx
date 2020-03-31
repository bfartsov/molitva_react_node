import React, { useState } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from "react-redux";
import {saveNews} from '../../../redux/actions/news'
import Alert from '../../alert'



import Buttons from "../../edit/button";
const AddNews = ({  news, saveNews, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    img: '',
    link: '',
    date: ''
  });

  
  const handnleSave = e => {
    e.preventDefault();
    saveNews(formData, history);


  
  };
  const handleCancel = ()=> history.push('/news');

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          News
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
                        type="text"
                        defaultValue={formData.title}
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
                        data={formData.text}
                        onInit={editor => {
                          // You can store the "editor" and use when it is needed.
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
                        defaultValue={formData.link}
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
                

                  <Buttons handleCancel={handleCancel} handnleSave={handnleSave} />
                </form>
           
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};


export default connect(null, { saveNews})(AddNews);
