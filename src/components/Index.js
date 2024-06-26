import React from "react";
import { useNavigate } from "react-router-dom";
import cotton from "../assets/cotton.jpeg";
import sareeImage from "../assets/saree.webp";
import "../styles/Index.css";

const images = [
  { url: sareeImage, text: "Sample Text 1", offer: "50% off on Cotton Sarees" },
  { url: sareeImage, text: "Sample Text 2", offer: "25% off on Silk Sarees" },
  { url: sareeImage, text: "Sample Text 3", offer: "Special discounts on Kotta Cotton" },
  { url: sareeImage, text: "Sample Text 4", offer: "Flat 30% off on Soft Silk Sarees" },
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
          <div onClick={() => handleNavigation("/soft-silk")} className="category">
            <img src={cotton} alt="soft-silk" />
            <p>Soft Silk</p>
          </div>
          <div onClick={() => handleNavigation("/pochampalli")} className="category">
            <img src={cotton} alt="pochampalli" />
            <p>Pochampalli</p>
          </div>
          <div onClick={() => handleNavigation("/silk-cotton")} className="category">
            <img src={cotton} alt="silk-cotton" />
            <p>Silk Cotton</p>
          </div>
        </div>
      </section>
      <section className="section-2">
        <div className="card-container">
          {images.map((image, index) => (
            <div key={index} className="card" onClick={() => handleNavigation("/offer")}>
              <div
                className="card-content"
                style={{ backgroundImage: `url(${image.url})` }}
              >
                <div className="offer-info">
                  <p>{image.offer}</p>
                </div>
                <div className="card-text">
                  <p>{image.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="about" className="section-3">
        <div className="about-content">
          <h2 id="section3-title">Crafting Handloom Sarees</h2>
          <p>
            "At Kharthika Sarees, we're not just creating handloom sarees; <br />
            we're weaving the art of tradition into every intricate thread,
            delivering elegance that transcends time."
          </p>
          <div className="videos">
            <div className="video">
              <iframe
                title="Crafting Handloom Sarees Video 1"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/H-SqHgK8j5A?si=IhJs6GxfQ26ggZmg&autoplay=0&mute=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video">
              <iframe
                title="Crafting Handloom Sarees Video 2"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/hbwU8YjIsIs?si=xjd31ndel2KXxgEo&autoplay=0&mute=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video">
              <iframe
                title="Crafting Handloom Sarees Video 3"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/NEEG30J-Ur4?si=oJg48YCmRQmEyNHw"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video">
              <iframe
                title="Crafting Handloom Sarees Video 4"
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Yjr4gpOSdrs?si=fOIs-4RX77obGyMu"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <p className="section-description">
            Explore the artistry and tradition behind every saree.
          </p>
        </div>
      </section>
      <section className="section-4">
        {/* Offer section */}
      </section>
    </div>
  );
};

export default Index;
