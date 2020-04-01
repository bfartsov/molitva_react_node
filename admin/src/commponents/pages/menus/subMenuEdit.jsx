import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { editMenu } from "../../../redux/actions/menus";
import Alert from '../../alert';


import Buttons from "../../edit/button";
const SubMenuedit = ({ match, edit, menu, editMenu, history, location }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    status: '',
    order: '',

  });


  useEffect(() => {
    edit("menus", match.params.id);
    const subMenu = menu && !menu.loading && menu.subMenu.find(item => item._id === match.params.subMenu)
    setFormData({
      name: subMenu.name ? subMenu.name : '',
      url: subMenu.url ? subMenu.url : '',
      status: subMenu.status ? subMenu.status : '',
      order: subMenu.order ? subMenu.order : '',

    })

  }, [menu.loading]);


  const handleDelete = () => {

  };


  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/events/${match.params.id}`;
    editMenu(formData, history, match.params.subMenu, `/menus/edit/${match.params.id}`)
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Sub Menus
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
                        onChange={e => onChange(e)}
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
                      <select name='status' className="form-control" onChange={e => onChange(e)}>
                        <option >Enable</option>
                        <option >Disable</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Order
                    </label>
                    <div className="col-md-4">
                      <input
                        onChange={e => onChange(e)}
                        type="number"
                        name="order"
                        className="default"
                        defaultValue={formData.order}
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
  menu: state.edit

});
export default connect(mapStateToProps, { edit, editMenu })(SubMenuedit);
