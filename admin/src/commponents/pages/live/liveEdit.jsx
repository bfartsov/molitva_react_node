import React, { useState, useEffect } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { saveLive } from "../../../redux/actions/live";
import Alert from "../../alert";

import Buttons from "../../edit/button";
const EditLive = ({ match, edit, live, history, saveLive }) => {
  const [formData, setFormData] = useState({
    url: "",
    type: "",
    player: "",
    text: "",
  });
  useEffect(() => {
    edit("live", match.params.id);
    setFormData({
      url: live.url ? live.url : "",
      type: live.type ? live.type : "",
      player: live.player ? live.player : "",
      text: live.text ? live.text : "",
    });
  }, [live.loading]);

  const handnleSave = (e) => {
    e.preventDefault();
    saveLive(formData, history);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleCancel = () => history.push("/banners");
  console.log(formData);
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Live
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <Alert />
              </h4>
              <form className="form-horizontal style-form">
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">Url</label>
                  <div className="col-sm-10">
                    <input
                      onChange={(e) => onChange(e)}
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
                    <select
                      name="type"
                      defaultValue={live.type}
                      className="form-control"
                      onChange={(e) => onChange(e)}
                    >
                      <option value="Youtube">Youtube</option>
                      <option value="Wowza"> Wowza</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-2 col-sm-2 control-label">
                    Player
                  </label>
                  <div className="col-sm-10">
                    <select
                      name="player"
                      defaultValue={live.player}
                      className="form-control"
                      onChange={(e) => onChange(e)}
                    >
                      <option value="JWPlayer">JWPlayer</option>
                      <option value="Wowza">Wowza</option>
                    </select>
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
                      data={live.text}
                      onInit={(editor) => {
                        // You can store the "editor" and use when it is needed.
                      }}
                      onChange={(event, editor) => {
                        const text = editor.getData();
                        setFormData({ ...formData, text });
                      }}
                      onBlur={(event, editor) => {
                        const text = editor.getData();
                        setFormData({ ...formData, text });
                      }}
                      onFocus={(event, editor) => {
                        const text = editor.getData();
                        setFormData({ ...formData, text });
                      }}
                    />
                  </div>
                </div>

                <Buttons
                  handleCance={() => handleCancel()}
                  handnleSave={handnleSave}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
const mapStateToProps = (state) => ({
  live: state.edit,
});
export default connect(mapStateToProps, { edit, saveLive })(EditLive);
