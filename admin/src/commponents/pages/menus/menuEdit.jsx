import React, { useState, useEffect } from "react";
import Alert from '../../alert'

import { connect } from "react-redux";
import { edit } from "../../../redux/actions/edit";
import { editMenu } from "../../../redux/actions/menus";

import Buttons from "../../edit/button";
const EditMenu = ({ match, edit, menu, editMenu, history, location }) => {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    status: '',
    order: '',
    subMenu: [],
    
  });
  useEffect(() => {
    edit("menus", match.params.id);
    setFormData({
      name: menu.name ? menu.name : '',
      url: menu.url ? menu.url : '',
      status: menu.status ? menu.status : '',
      order: menu.order ? menu.order : '',
      subMenu: menu.subMenu ? menu.subMenu : [],
     
    })
  }, [menu.loading]);
const handleDelete = ()=>{

}


  const handnleSave = e => {
    e.preventDefault();
    const url = `http://localhost:8080/api/menus/${match.params.id}`;

    console.log(formData)
    editMenu(formData, history, match.params.id, '/menus');
  };

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <Alert/>
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
                        defaultValue={menu.name}
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
                        defaultValue={menu.url}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 col-sm-2 control-label">
                      Status
                    </label>
                    <div className="col-sm-10">
                    <select name='status' defaultValue={menu.status} className="form-control" onChange={e => onChange(e)}>
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
                        defaultValue={menu.order}
                      />
                    </div>
                  </div>
                
                  <Buttons handnleSave={handnleSave} />
                </form>
              )}
              {menu.subMenu &&  menu.subMenu.length > 0 &&  <section id="unseen">
               <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Id</th>
                      <th> Name</th>
                      
                      <th> Url</th>
                      <th> Status</th>
                      <th> Order</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu.subMenu.map(item => {
                      return (
                        <tr key={item._id}>
                          <td> {item._id}</td>
                          <td> {item.name}</td>
                          <td> {item.url}</td>
                          <td> {item.status}</td>
                          <td> {item.order}</td>
                         
                          <td>
                            <button
                              onClick={() => {
                                history.push(
                                  `${location.pathname}/subMenu/${item._id}`
                                );
                              }}
                              className="btn btn-primary btn-xs"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              id={item._id}
                              onClick={()=>handleDelete(item._id)}
                              className="btn remove btn-danger btn-xs"
                            >
                              <i className="fa fa-trash-o "></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </section>}
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
export default connect(mapStateToProps, { edit, editMenu })(EditMenu);
