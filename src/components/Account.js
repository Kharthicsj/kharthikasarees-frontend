import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from './Loading'; // Make sure to import your Loading component
import '../styles/Account.css';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state for data fetch
  const [submitting, setSubmitting] = useState(false); // Add loading state for form submission
  const [address, setAddress] = useState({
    addressLine1: '',
    city: '',
    state: '',
    pincode: '',
    phonenumber: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (userEmail) {
        try {
          const response = await axios.get('https://kharthikasarees-backend.onrender.com/api/user', {
            params: { email: userEmail }
          });
          if (response.status === 200) {
            setUserData(response.data);
            setAddress({
              addressLine1: response.data.address || '',
              city: response.data.city || '',
              state: response.data.state || '',
              pincode: response.data.pincode || '',
              phonenumber: response.data.phonenumber || ''
            });
          } else {
            console.error('Failed to fetch user data:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      } else {
        setLoading(false); // Set loading to false if no user email found
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true); // Set submitting to true when form is submitted
    const userEmail = localStorage.getItem('userEmail');
    try {
      const response = await axios.post("https://kharthikasarees-backend.onrender.com/update-address", {
        email: userEmail,
        address,
        phonenumber: address.phonenumber
      });
      if (response.data.success) {
        alert('Address updated successfully');
        // Refresh page to fetch updated data
        window.location.reload();
      } else {
        alert('Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
      alert('An error occurred while updating the address');
    } finally {
      setSubmitting(false); // Set submitting to false after the request is done
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAddress({
      ...address,
      [name]: value
    });
  }

  if (loading) {
    return <Loading />; // Render the Loading component while loading
  }

  return (
    <div className="account-container">
      <span className="material-symbols-outlined account-icon">
        account_circle
      </span>
      <h2 id='account-title'>Account Information</h2>
      {userData ? (
        <div className="account-info">
          <p><b>First Name: </b>{userData.firstname}</p>
          <p><b>Last Name: </b>{userData.lastname}</p>
          <p><b>Email: </b>{userData.email}</p>
          <p><b>Address: </b>{address.addressLine1}, {address.city}, {address.state} - {address.pincode}</p>
          <p><b>Phone: </b>{address.phonenumber}</p>
        </div>
      ) : (
        <p>Unable to reach server, please try again later...</p>
      )}
      <form className="account-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="addressLine1" 
          placeholder="Address Line" 
          value={address.addressLine1} 
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="city" 
          placeholder="City" 
          value={address.city} 
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="state" 
          placeholder="State" 
          value={address.state} 
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="pincode" 
          placeholder="Pincode" 
          value={address.pincode} 
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="phonenumber" 
          placeholder="Phone Number" 
          value={address.phonenumber} 
          onChange={handleInputChange} 
        />
        <button type="submit" disabled={submitting}>
          {submitting ? <span className="spinner"></span> : 'Update Address'}
        </button>
      </form>
    </div>
  );
};

export default Account;
