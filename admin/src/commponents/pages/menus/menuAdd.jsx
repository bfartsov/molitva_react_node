import React, { useState, useEffect } from "react";
import Alert from "../../alert";

import { connect } from "react-redux";
import { addMenu, getFrontMenus } from "../../../redux/actions/menus";

import Buttons from "../../edit/button";
const AddMenu = ({ history, loading, menu, getFrontMenus, addMenu }) => {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    status: "",
    order: "",
    parentElement: "topLevel",
  });
  useEffect(() => {
    getFrontMenus();
  }, [loading]);
  const handleDelete = () => {};

  const handnleSave = (e) => {
    e.preventDefault();

    addMenu(formData, history);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCancel = () => history.push("/banners");

  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Menus
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <Alert />
              </h4>
              {menu && (
                <form className="form-horizontal style-form">
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Name
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={onChange}
                        type="text"
                        defaultValue={formData.name}
                        // defaultValue={menu.title}
                        name="name"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Url
                    </label>
                    <div className="col-sm-10">
                      <input
                        onChange={(e) => onChange(e)}
                        type="text"
                        name="url"
                        defaultValue={formData.url}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Status
                    </label>
                    <div className="col-sm-10">
                      <select
                        name="status"
                        defaultValue={formData.status}
                        className="form-control"
                        onChange={(e) => onChange(e)}
                      >
                        <option>Enable</option>
                        <option>Disable</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Order
                    </label>
                    <div className="col-md-4">
                      <input
                        onChange={(e) => onChange(e)}
                        type="number"
                        name="order"
                        className="default"
                        defaultValue={formData.order}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Perant element
                    </label>
                    <div className="col-md-4">
                      <select
                        onChange={(e) => onChange(e)}
                        name="parentElement"
                      >
                        <option value="topLevel">Top Level</option>
                        {menu.map((item) => (
                          <option key={item._id} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Buttons
                    handleCancel={() => {
                      handleCancel();
                    }}
                    handnleSave={handnleSave}
                  />
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
const mapStateToProps = (state) => ({
  menu: state.menus.menus,
  loading: state.menus.loading,
});
export default connect(mapStateToProps, { getFrontMenus, addMenu })(AddMenu);
