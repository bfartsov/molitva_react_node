import React, { useEffect } from "react";
import Alert from '../../alert'

import { connect } from "react-redux";
import { getBanners, removeBanner } from "../../../redux/actions/banners";

const BannerPage = ({ banners, loading, getBanners, removeBanner, history }) => {
  useEffect(() => {
    getBanners();

  }, []);// eslint-disable-next-line react-hooks/exhaustive-deps


  const handleDelete = id => {
    removeBanner(id)

  };
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> banners
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <Alert />
              </h4>
              <button className="btn btn-theme" onClick={() => history.push('/banners/add')} >
                  Add Banner
                </button>
              <section id="unseen">
               
                <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Title</th>
                      <th> Image</th>
                      <th> Date</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.length > 0 && !loading && banners.map(banner => {
                      return (
                        <tr key={banner._id}>
                          <td> {banner.title}</td>
                          <td> {banner.img}</td>
                          <td> {banner.eventDate}</td>

                          <td>
                            <button
                              onClick={() => {
                                history.push(
                                  `banners/edit/${banner._id}`
                                );
                              }}
                              className="btn btn-primary btn-xs"
                            >
                              <i className="fa fa-pencil"></i>
                            </button>
                            <button
                              id={banner._id}
                              onClick={() => handleDelete(banner._id)}
                              className="btn btn-danger btn-xs"
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
};
const mapStateToProps = state => ({
  banners: state.banners.banners,
  loading: state.banners.loading
});
export default connect(mapStateToProps, { getBanners, removeBanner })(BannerPage);
