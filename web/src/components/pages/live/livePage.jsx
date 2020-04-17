import React, { useState, useEffect } from "react";
import PageTitle from "../../main/pageTittle";
import JWPlayer from "./jwplayer";

import { connect } from "react-redux";
import { getLive } from "../../../redux/actions/live";

const LivePage = ({ live, getLive }) => {
  useEffect(() => {
    getLive();
  }, []);
  return (
    <div id="main">
      <PageTitle title={"На Живо"} />

      <section className="blog-detail sermon-detail">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7">
              <div className="sermon-frame">
                <div className="sermon-detail-row">
                  <JWPlayer id={"1"} url={live.url} />
                </div>
              </div>

              <blockquote>
                <i className="fa"></i>
                <p>
                  <strong
                    dangerouslySetInnerHTML={{
                      __html: live.text,
                    }}
                  ></strong>
                </p>
                <i className="fa"></i>{" "}
              </blockquote>
              <h3> При проблеми с излъчването</h3>
              <p>
                За да гледате молитвата на живо трябва да си включите флаш-а
                (flash) на браузера.
              </p>
              <p>Ето инструкции как да го направите:</p>
              <p>Google Chrome</p>
              <ol className="flash">
                <li>Отворете Chrome на компютъра си.</li>
                <li>
                  Горе вдясно кликнете върху „Още“ Още и след това Настройки.
                </li>
                <li>Кликнете върху Разширени в долната част.</li>
                <li>
                  Под „Поверителност и сигурност“ кликнете върху Настройки за
                  съдържанието.
                </li>
                <li>Кликнете върху Flash.</li>
                <li>Включете Разрешаване на сайтовете да изпълняват Flash.</li>
                <li>изключете Първо ще се извежда запитване.</li>
                <li>
                  Върнете се към страницата със съдържанието с Flash. Ако не се
                  зареди автоматично, кликнете върху бутона Презареждане горе
                  вляво.
                </li>
              </ol>
              <p>
                Инструкции на англиски:{" "}
                <a href="https://helpx.adobe.com/flash-player/kb/enabling-flash-player-chrome.html">
                  https://helpx.adobe.com/flash-player/kb/enabling-flash-player-chrome.html
                </a>
              </p>
              <p>
                Инструкции на англиски:{" "}
                <a href="https://helpx.adobe.com/flash-player/kb/enabling-flash-player-chrome.html">
                  https://helpx.adobe.com/flash-player/kb/enabling-flash-player-chrome.html
                </a>
              </p>
              <p>
                FireFox -{" "}
                <a href="https://helpx.adobe.com/ru/flash-player/kb/enabling-flash-player-firefox.html">
                  https://helpx.adobe.com/ru/flash-player/kb/enabling-flash-player-firefox.html
                </a>
              </p>
              <p>
                Също така ако не е инсталиран flash на вашия компютър трябва да
                го иснтарирате от следния линк:{" "}
                <a href="https://get.adobe.com/flashplayer">
                  https://get.adobe.com/flashplayer/
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  live: state.live.live,
});
export default connect(mapStateToProps, { getLive })(LivePage);
