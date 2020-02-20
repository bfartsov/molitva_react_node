import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/helpers";

import Input from "./imput";

const Edit = ({ match }) => {
  const [items, setItem] = useState("");

  useEffect(() => {
    const category = match.url.split("/");
    fetchData(
      `http://localhost:8080/api/${category[1]}/id/${match.params.id}`,
      setItem
    );
  }, []);
  console.log(items);
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
                    console.log(text);
                    if (item === "img") {
                      return (
                        <Input
                          title={item.toUpperCase()}
                          text={text}
                          type={"file"}
                        />
                      );
                    } else if (
                      item === "_id" ||
                      item === "__v" ||
                      item === "dateCreated"
                    ) {
                      return "";
                    } else {
                      return (
                        <Input
                          title={item.toUpperCase()}
                          text={text}
                          type={"text"}
                        />
                      );
                    }
                  })}
              </form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
export default Edit;
