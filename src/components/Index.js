import React from "react";
import { useNavigate } from "react-router-dom";
import cotton from "../assets/cotton.jpeg";
import "../styles/Index.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { url: require("../assets/saree.webp") },
  { url: require("../assets/saree.webp") },
  { url: require("../assets/saree.webp") },
  { url: require("../assets/saree.webp") },
  { url: require("../assets/saree.webp") },
  { url: require("../assets/saree.webp") },
  { url: require("../assets/saree.webp") },
];

const Index = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <section className="section-1">
        <div className="categories-container">
          <div onClick={() => handleNavigation("/cotton")} className="category">
            <img src={cotton} alt="cotton" />
            <p>Cotton</p>
          </div>
          <div onClick={() => handleNavigation("/kotta")} className="category">
            <img src={cotton} alt="kotta" />
            <p>Kotta Cotton</p>
          </div>
          <div
            onClick={() => handleNavigation("/soft-silk")}
            className="category"
          >
            <img src={cotton} alt="soft-silk" />
            <p>Soft Silk</p>
          </div>
          <div
            onClick={() => handleNavigation("/pochampalli")}
            className="category"
          >
            <img src={cotton} alt="pochampalli" />
            <p>Pochampalli</p>
          </div>
          <div
            onClick={() => handleNavigation("/silk-cotton")}
            className="category"
          >
            <img src={cotton} alt="silk-cotton" />
            <p>Silk Cotton</p>
          </div>
        </div>
      </section>
      <section className="section-2">
        <div className="image-slider">
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt={`slide-${index}`} />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className="section-3">
        {/* Offer section */}
      </section>
    </div>
  );
};

export default Index;
