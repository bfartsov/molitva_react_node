import React, { useEffect } from "react";
import SermonBox from "./sermonBox";
import WelcomeMessage from "./welcomeMessage";
import HomeWidget from "./homeWidget";
import QuoteMessage from "./quteMessage";
import LatestEvents from "./latestEvent";
import News from "./news";
import VideosHomePage from "./VideosHomePage";
import { getHomePageVideos } from "../../redux/actions/video";
import { getHomePageNews } from "../../redux/actions/news";

//redux
import { connect } from "react-redux";
import { getEvents } from "../../redux/actions/events";

const Main = ({
  getEvents,
  events,
  videos,
  news,
  getHomePageVideos,
  getHomePageNews,
}) => {
  useEffect(() => {
    getEvents();
    getHomePageVideos();
    getHomePageNews();
  }, []);
  return (
    <div id="main">
      <SermonBox />
      <WelcomeMessage />
      <HomeWidget />
      <QuoteMessage />
      <LatestEvents events={events.events} />
      <VideosHomePage videos={videos.HomePageVideos} />
      <News newsHome={news.homePageNews} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  events: state.events,
  videos: state.videos,
  news: state.news,
});
export default connect(mapStateToProps, {
  getEvents,
  getHomePageVideos,
  getHomePageNews,
})(Main);
