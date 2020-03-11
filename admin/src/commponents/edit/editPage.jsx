import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/helpers";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { edit } from "../../redux/actions/edit";

import Input from "./imput";
import Buttons from "./button";
const Edit = ({ match, edit, items }) => {
  const [names, setName] = useState({});

  useEffect(() => {
    const category = match.url.split("/");
    edit(category[1], match.params.id);
  }, []);
  const handnleSave = e => {
    e.preventDefault();
  };

  const handleChange = e => {
    let name = e.target.name;
    const value = e.target.value;
    const newItem = {};
    newItem[name] = value;

    setName({ ...names, ...newItem });
  };
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Form Components
        </h3>

        <div className="row mt">
          <div className="col-lg-12">
            <div className="form-panel">
              <h4 className="mb">
                <i className="fa fa-angle-right"></i> Form Elements
              </h4>
              <form className="form-horizontal style-form">
                {items &&
                  Object.keys(items).map(item => {
                    const text = items[item];
                    if (item === "img" || item === "banner") {
                      return (
                        <Input
                          key={item}
                          handleChange={handleChange}
                          title={item.toUpperCase()}
                          text={text}
                          type={"file"}
                          name={item}
                        />
                      );
                    } else if (
                      item === "_id" ||
                      item === "__v" ||
                      item === "dateCreated" ||
                      item === "updated" ||
                      item === "name"
                    ) {
                      return "";
                    } else {
                      return (
                        <Input
                          key={item}
                          handleChange={handleChange}
                          title={item.toUpperCase()}
                          text={text}
                          type={"text"}
                          name={item}
                        />
                      );
                    }
                  })}
                <Buttons handnleSave={handnleSave} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
const mapStateToProps = state => ({
  items: state.edit
});
export default connect(mapStateToProps, { edit })(Edit);
