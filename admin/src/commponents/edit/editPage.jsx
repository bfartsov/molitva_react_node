import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/helpers";
import { useHistory, useLocation } from "react-router-dom";

import Input from "./imput";
import Buttons from "./button";
const Edit = ({ match, location }) => {
  const [items, setItem] = useState({});
  const [names, setName] = useState({});

  useEffect(() => {
    const category = match.url.split("/");
    category[1] === "live"
      ? fetchData(`http://localhost:8080/api/${category[1]}`, setItem)
      : fetchData(
          `http://localhost:8080/api/${category[1]}/id/${match.params.id}`,
          setItem
        );
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
  console.log(names);
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
              <form className="form-horizontal style-form" method="get">
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
export default Edit;
