import React from "react";
import ReactJWPlayer from "react-jw-player";

const JWPlayer = ({ id, url }) => {
  return (
    <ReactJWPlayer
      playerId={id}
      playerScript="https://cdn.jwplayer.com/libraries/aIwBA1sT.js"
      file={url}
    />
  );
};
export default JWPlayer;
