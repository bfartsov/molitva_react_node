import React from "react";

const PageImg = ({ img }) => {
  return (
    <div class="frame">
      <a href="/">
        <img src={img} alt="img" />
      </a>
    </div>
  );
};

export default PageImg;
