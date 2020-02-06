import React, { useState, useEffect } from "react";
import SermonBox from "./sermonBox";
import WelcomeMessage from "./welcomeMessage";
import HomeWidget from "./homeWidget";
import QuoteMessage from "./quteMessage";
import LatestEvents from "./latestEvent";
import News from "./news";
import VideosHomePage from "./VideosHomePage";

const Main = () => {
  const [events, setEvents] = useState("");
  const [videos, setVideos] = useState("");
  const fetchData = async (url, cb, number) => {
    // const response = await axios.get(url, {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json"
    //   }
    // });
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      cb(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData("http://localhost:8080/api/events/filter/4", setEvents);
    fetchData("http://localhost:8080/api/videos/HomePage", setVideos);
  }, []);

  return (
    <div id="main">
      <SermonBox />
      <WelcomeMessage />
      <HomeWidget />
      <QuoteMessage />
      <LatestEvents events={events} />
      <VideosHomePage videos={videos} />
      <News />
    </div>
  );
};
export default Main;
