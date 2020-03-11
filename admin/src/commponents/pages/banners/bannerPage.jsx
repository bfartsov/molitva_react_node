import React, { useEffect } from "react";
import Table from "../../table";
import { connect } from "react-redux";
import { getBanners } from "../../../redux/actions/banners";

const BannerPage = ({ banners, items, title, loading, getBanners }) => {
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
          <i className="fa fa-angle-right"></i> Videos
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <i className="fa fa-angle-right"></i> Responsive Table
              </h4>
              <section id="unseen">
                {banners.length > 0 && !loading && (
                  <Table
                    titles={title}
                    items={items}
                    handleDelete={handleDelete}
                  />
                )}
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
  items: state.banners.items,
  title: state.banners.title,
  loading: state.banners.loading
});
export default connect(mapStateToProps, { getBanners })(BannerPage);
