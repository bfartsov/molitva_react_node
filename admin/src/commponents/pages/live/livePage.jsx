import React, { useEffect, useState } from "react";
import { fetchData } from "../../../utils/helpers";
import Table from "../../table";
import "../../../css/table-responsive.css";

const LivePage = () => {
  const [live, setLive] = useState("");
  useEffect(() => {
    fetchData("http://localhost:8080/api/live", setLive);
  }, []);
  let title = {};
  let items = [];
  if (live) {
    const item = {
      id: live._id,
      url: live.url,

      type: live.type,

      player: live.player
    };
    items.push(item);
  }

  items.length > 0 ? (title = Object.keys(items[0])) : (title = []);
  const handleDelete = e => {
    e.preventDefault();
  };
  return (
    <section id="main-content">
      <section className="wrapper">
        <h3>
          <i className="fa fa-angle-right"></i> Live
        </h3>
        <div className="row mt">
          <div className="col-lg-12">
            <div className="content-panel">
              <h4>
                <i className="fa fa-angle-right"></i> Responsive Table
              </h4>
              <section id="unseen">
                {live && (
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

export default LivePage;
