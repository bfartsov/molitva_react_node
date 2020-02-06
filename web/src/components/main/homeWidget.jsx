import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faUsers } from "@fortawesome/free-solid-svg-icons";
const HomeWidget = () => {
  return (
    <section className="home-widget-box">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <div className="widget-box">
              <div className="round">
                <FontAwesomeIcon
                  className="fa fa-thumbs-o-up"
                  icon={faThumbsUp}
                />
              </div>

              <p>За спасението на хората в България </p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="widget-box active">
              <div className="round">
                <FontAwesomeIcon
                  className="fa fa-thumbs-o-up"
                  size="xs"
                  icon={faUsers}
                />
              </div>

              <p>
                За подобряване на състоянието на църквата - Тялото Христово в
                България като смирение, братолюбие и единство{" "}
              </p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="widget-box active">
              <div className="round">
                <FontAwesomeIcon className="fa fa-thumbs-o-up" icon={faUsers} />{" "}
              </div>

              <p>
                За положителна промяна в политиката,в икономиката,
                образованието, здравеопазването, медиите, семейните ценности{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HomeWidget;
