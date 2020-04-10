import React, { useState, useEffect } from "react";
import SermonBox from "./sermonBox";
import WelcomeMessage from "./welcomeMessage";
import HomeWidget from "./homeWidget";
import QuoteMessage from "./quteMessage";
import LatestEvents from "./latestEvent";
import News from "./news";
import VideosHomePage from "./VideosHomePage";
import { fetchData } from "../../utils/helpers";

//redux
import { connect } from "react-redux";
import { getEvents } from "../../redux/actions/events";

const Main = ({ getEvents, events }) => {
  const [videos, setVideos] = useState("");
  const [news, setNews] = useState("");

  useEffect(() => {
    getEvents();
    // fetchData("http://localhost:8080/api/events/limit/4", setEvents, "events");
    fetchData("http://localhost:8080/api/videos/HomePage", setVideos);
    fetchData("http://localhost:8080/api/news/limit/2", setNews);
  }, []);
  return (
    <div id="main">
      <SermonBox />
      <WelcomeMessage />
      <HomeWidget />
      <QuoteMessage />
      <LatestEvents events={events.events} />
      <VideosHomePage videos={videos} />
      <News newsHome={news} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  events: state.events,
});
export default connect(mapStateToProps, { getEvents })(Main);
