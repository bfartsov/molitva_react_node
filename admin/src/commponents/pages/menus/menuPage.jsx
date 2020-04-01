import React, { useEffect } from "react";
import Alert from '../../alert'
import { connect } from "react-redux";
import { getFrontMenus } from "../../../redux/actions/menus";
import "../../../css/table-responsive.css";

const MenuPage = ({ getFrontMenus, menus, history, location, }) => {
  useEffect(() => {
    getFrontMenus()
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const handleDelete = (id) => {
    console.log(id)

  };
  console.log(menus)
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Menus
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <Alert />
              </h4>
              <section id="unseen">
              <button className="btn btn-theme" onClick={() => history.push('/menus/add')} >
                  Add Menu
                </button>
                <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Name</th>

                      <th> Url</th>
                      <th> Status</th>
                      <th> Order</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus && !menus.loading && menus.map(item => {
                      return (
                        <tr key={item._id}>
                          <td> {item.name}</td>
                          <td> {item.url}</td>
                          <td> {item.status}</td>
                          <td> {item.order}</td>

                          <td>
                            <button
                              onClick={() => {
                                history.push(
                                  `${location.pathname}/edit/${item._id}`
                                );
                              }}
                              className="btn btn-primary btn-xs"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              id={item._id}
                              onClick={() => handleDelete(item._id)}
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
              </section>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
const mapStateToProps = state => ({
  menus: state.menus.menus
});

export default connect(mapStateToProps, { getFrontMenus })(MenuPage);
