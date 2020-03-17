import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBanners } from "../../../redux/actions/banners";

const BannerPage = ({ banners, loading, getBanners , history}) => {
  useEffect(() => {
    getBanners();
  }, []);

  const handleDelete = e => {
    e.preventDefault();
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
                <i className="fa fa-angle-right"></i> Responsive Table
              </h4>
              <section id="unseen">
                <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Id</th>
                      <th> Title</th>
                      <th> Image</th>
                      <th> Date</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.map(banner => {
                      return (
                        <tr key={banner._id}>
                          <td> {banner._id}</td>
                          <td> {banner.title}</td>
                          <td> {banner.banner}</td>
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
                              onClick={handleDelete}
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
export default connect(mapStateToProps, { getBanners })(BannerPage);
