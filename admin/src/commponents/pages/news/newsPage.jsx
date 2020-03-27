import React, { useEffect } from "react";
import Alert from '../../alert'
import { connect } from "react-redux";
import { getNews, removeNews } from "../../../redux/actions/news";
import "../../../css/table-responsive.css";

const NewsPage = ({ news, history, location, getNews, removeNews }) => {
  useEffect(() => {
    getNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

  const handleDelete = (id) => {
    console.log(id)
    removeNews(id)
  };
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> news
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <Alert />
              </h4>
              <section id="unseen">
                <table className="table table-bordered table-striped table-condensed">
                  <thead>
                    <tr>
                      <th> Id</th>
                      <th> Title</th>

                      <th> Link</th>
                      <th> Date</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {news && news.length > 0 && news.map(item => {
                      return (
                        <tr key={item._id}>
                          <td> {item._id}</td>
                          <td> {item.title}</td>
                          <td> {item.link}</td>
                          <td> {item.date}</td>

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
  news: state.news.news
});

export default connect(mapStateToProps, { getNews, removeNews })(NewsPage);
