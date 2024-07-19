import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Signup.css";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [values, setValues] = useState({
    firstname: queryParams.get("firstname") || "",
    lastname: queryParams.get("lastname") || "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState(""); // State to hold OTP input
  const [otpSent, setOtpSent] = useState(false); // State to track if OTP is sent
  const [error, setError] = useState(""); // State to hold error message
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State to hold checkbox value
  const [otpLoading, setOtpLoading] = useState(false); // Add OTP loading state

  useEffect(() => {
    // Update form fields when firstname and lastname change
    setValues((prevValues) => ({
      ...prevValues,
      firstname: values.firstname,
      lastname: values.lastname,
    }));
  }, [values.firstname, values.lastname]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleCheckboxChange = (event) => {
    setAcceptedTerms(event.target.checked);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSendOtp = (event) => {
    event.preventDefault();
    setOtpLoading(true);
    axios
      .post("https://kharthikasarees-backend.onrender.com/generate-otp", { email: values.email })
      .then((res) => {
        setOtpSent(true);
        setOtpLoading(false);
      })
      .catch((err) => {
        setError("Error sending OTP. Please try again.");
        setOtpLoading(false);
      });
  };

  const handleVerifyOtp = (event) => {
    event.preventDefault();
    setOtpLoading(true);
    axios
      .post("https://kharthikasarees-backend.onrender.com/signup-verify", { 
        email: values.email, 
        otp,
        firstname: values.firstname,
        lastname: values.lastname,
        password: values.password
      })
      .then((res) => {
        console.log("Registered Successfully");
        redirect();
      })
      .catch((err) => {
        setError("Invalid OTP or registration error. Please try again.");
        setOtpLoading(false);
      });
  };

  const redirect = () => {
    navigate("/");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-heading">Sign Up with KharthikaSarees</h1>
        {!otpSent ? (
          <form className="signup-form" onSubmit={handleSendOtp}>
            <input
              type="text"
              className="signup-input"
              id="firstname"
              name="firstname"
              placeholder="First Name *"
              value={values.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="signup-input"
              id="lastname"
              name="lastname"
              placeholder="Last Name *"
              value={values.lastname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="signup-input"
              id="email"
              name="email"
              placeholder="Mail Id *"
              value={values.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="signup-input"
              id="password1"
              name="password"
              placeholder="Password *"
              value={values.password}
              onChange={handleChange}
              required
            />
            <div className="terms-container">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={acceptedTerms}
                onChange={handleCheckboxChange}
                required
              />
              <label htmlFor="terms">
                I accept the <Link to="/terms">Terms and Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>.
              </label>
            </div>
            <button type="submit" className="signup-submit" disabled={otpLoading}>
              {otpLoading ? <span className="spinner"></span> : 'Send OTP'}
            </button>
            {error && <div className="signup-error">{error}</div>}
          </form>
        ) : (
          <form className="signup-form" onSubmit={handleVerifyOtp}>
            <input
              type="text"
              className="signup-input"
              id="otp"
              name="otp"
              placeholder="Enter OTP *"
              value={otp}
              onChange={handleOtpChange}
              required
            />
            <button type="submit" className="signup-submit" disabled={otpLoading}>
              {otpLoading ? <span className="spinner"></span> : 'Verify OTP'}
            </button>
            {error && <div className="signup-error">{error}</div>}
          </form>
        )}
        <div className="signup-link-container">
          <p>Already a user? <Link to="/login" className="signup-link">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
