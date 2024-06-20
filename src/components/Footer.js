import React from "react";
import "../../src/styles/Footer.css";
import facebooklogo from "../assets/facebook.png";
import instalogo from "../assets/instagram.png";
import youtubelogo from "../assets/youtube.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="newsletter">
        <h2 className="section-title">Subscribe to our Newsletter</h2>
        <form action="#" method="post">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
      <div className="google-map">
        <iframe
          title="Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.3547251539767!2d77.18078967516928!3d10.86060148929335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba84d30835759ad%3A0x6d22f43ff137afd7!2sKharthika%20Sarees!5e0!3m2!1sen!2sin!4v1693806464107!5m2!1sen!2sin"
          width="300"
          height="300"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
      <div className="about-details">
        <h2 className="section-title">About Us</h2>
        <p className="section-description">
          We are passionate about preserving the art of handloom sarees.
        </p>
        <p className="contact-info">
          Gmail:{" "}
          <a href="mailto:kharthikasarees@gmail.com" rel="noopener noreferrer">
            kharthikasarees@gmail.com
          </a>
          <br />
          Phone: <a href="tel:+919865857986">+91 9865857986</a>
          <br />
          Phone: <a href="tel:+917373849533">+91 7373849533</a>
          <br />
          <br />
          <a
            href="https://www.facebook.com/profile.php?id=61551011396598"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
          >
            <img src={facebooklogo} alt="Facebook" />
          </a>
          <a
            href="https://www.instagram.com/kharthika_sarees"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
          >
            <img src={instalogo} alt="Instagram" />
          </a>
          <a
            href="https://www.youtube.com/channel/UColMm4MyRnnSM8FuFExYIqA"
            target="_blank"
            rel="noopener noreferrer"
            title="Youtube"
          >
            <img src={youtubelogo} alt="Youtube" />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
