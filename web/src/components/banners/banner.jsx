import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Banner = ({ banners }) => {
  return (
    <section id="banner">
      <Carousel>
        {banners &&
          banners.map((banner) => {
            return (
              <Carousel.Item key={banner._id}>
                <img
                  className="d-block w-100"
                  src={banner.img}
                  alt={banner.title}
                />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </section>
  );
};
export default Banner;
