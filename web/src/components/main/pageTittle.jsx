import React from "react";

const PageTitle = ({ title }) => {
  return (
    <section className="inner-headding">
      <div className="container">
        <h1>{title}</h1>
        <p>Общо молитвено движение и братолюбие</p>
      </div>
    </section>
  );
};

export default PageTitle;
