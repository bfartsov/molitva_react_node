import React, { useState, useEffect } from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { save } from "../../../redux/actions/save";

import Buttons from "../../edit/button";
const EditLive = ({ match, edit, live, save }) => {
  const [formData, setFormData] = useState({
    url: '',
    type: '',
    player: '',
    text: '',
  });
  useEffect(() => {
    edit("live", match.params.id);
    setFormData({
      url: live.url ? live.url : '',
      type: live.type ? live.type : '',
      player: live.player ? live.player : '',
      text: live.text ? live.text : '',

    })
  }, [live.loading]);
  console.log(formData)


  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/events/${match.params.id}`;
    //save(url, names);
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  console.log(formData)
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Events
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
              </h4>
              {!live.loading && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Url
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={e => onChange(e)}
                        type="text"
                        defaultValue={live.url}
                        name="url"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Type
                    </label>
                    <div className="col-sm-10">
                      <select name='type' class="form-control" onChange={e => onChange(e)}>
                        <option selected={live.type === 'Wowza' ? 'true' : 'false'}>Youtube</option>
                        <option selected={live.type === 'Youtube' ? 'true' : 'false'}> Wowza</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Player
                    </label>
                    <div className="col-sm-10">
                      <select name='player' class="form-control" onChange={e => onChange(e)}>
                        <option selected={live.player === 'JWPplayer' ? 'true' : 'false'}>JWPlayer</option>
                        <option selected={live.player === 'Wowza' ? 'true' : 'false'}>Wowza</option>
                      </select>
                      {/* <input
                        onChange={e => onChange(e)}
                        type="text"
                        defaultValue={live.player}
                        name="player"
                        className="form-control"
                      /> */}
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
                        data={live.text}
                        onInit={editor => {
                          // You can store the "editor" and use when it is needed.
                          console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                          const text = editor.getData();
                          setFormData({ ...formData, text })

                        }}
                        onBlur={(event, editor) => {
                          const text = editor.getData();
                          setFormData({ ...formData, text })


                        }}
                        onFocus={(event, editor) => {
                          const text = editor.getData();
                          setFormData({ ...formData, text })


                        }}
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
  live: state.edit
});
export default connect(mapStateToProps, { edit, save })(EditLive);
