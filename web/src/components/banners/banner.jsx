import React from "react";
import img1 from "../../images/molitva-plovdiv.jpg";
import Carousel from "react-bootstrap/Carousel";

const Banner = ({ banners }) => {
  return (
    <section id="banner">
      <Carousel>
        {banners.length > 0 &&
          banners.map(banner => {
            return (
              <Carousel.Item key={banner}>
                <img className="d-block w-100" src={img1} alt="First slide" />
                <Carousel.Caption></Carousel.Caption>
              </Carousel.Item>
            );
          })}
      </Carousel>
    </section>
  );
};
export default Banner;
