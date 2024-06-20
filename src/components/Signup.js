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
  const [error, setError] = useState(""); // State to hold error message
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State to hold checkbox value
  const [loading, setLoading] = useState(false); // Add loading state

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!acceptedTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }
    setLoading(true); // Start loading
    axios
      .post("https://kharthikasarees-backend.onrender.com/signup", values)
      .then((res) => {
        console.log("Registered Successfully");
        redirect();
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("An error occurred during registration.");
        }
        setLoading(false); // End loading on error
      });
  };

  const redirect = () => {
    // Redirect to the signin page after successful registration
    // You can update the redirect URL as needed
    navigate("/"); // Use navigate to redirect
    setLoading(false); // End loading on success
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-heading">Sign Up with KharthikaSarees</h1>
        <form className="signup-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="signup-submit" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Sign Up'}
          </button>
          {error && <div className="signup-error">{error}</div>}
        </form>
        <div className="signup-link-container">
          <p>Already a user? <Link to="/login" className="signup-link">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
