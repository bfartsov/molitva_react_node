import React from "react";
import PageTitle from "../../main/pageTittle";
import JWPlayer from "./jwplayer";
const LivePage = () => {
  return (
    <div id="main">
      <PageTitle title={"На Живо"} />

      <section className="blog-detail sermon-detail">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-sm-7">
              <div className="sermon-frame">
                <div className="sermon-detail-row">
                  <JWPlayer
                    id={"1"}
                    url={
                      "https://59ce9bf092176.streamlock.net:1935/securestreaming/ngrp:720.sdp_all/playlist.m3u8"
                    }
                  />
                </div>
              </div>

              <blockquote>
                <i className="fa"></i>
                <p>
                  <strong>
                    Всяка регионална молитва ще се излъчва "на живо" по
                    интернет. Църквите в другите региони, които участват в
                    инициативата, по същото време ще направят свое молитвено
                    събрание и чрез телемост ще участват в тази обща регионална
                    молитвата, в реално време. Така "всички части на Тялото
                    Христово се молят заеднo", както и за съживление в цяла
                    България. Всяка година ще провеждаме национална обща
                    молитва, на която всички - събрани заедно, ще се молим за
                    съживление.
                  </strong>
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
export default LivePage;
