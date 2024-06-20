import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/Forgotpassword.css'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [showEmailForm, setShowEmailForm] = useState(true);
    const [redirectTimer, setRedirectTimer] = useState(5); // Initial value for countdown
    const navigate = useNavigate();

    useEffect(() => {
        let timer = null;
        if (step === 3 && successMessage === "Password updated successfully") {
            timer = setInterval(() => {
                setRedirectTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [step, successMessage]);

    const handleSubmitEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        setShowEmailForm(false); 
        try {
            await axios.post('https://kharthikasarees-backend.onrender.com/generate-otp', { email });
            setIsLoading(false); 
            setStep(2); 
        } catch (err) {
            setIsLoading(false); 
            setError(err.response.data.error || "Failed to send OTP");
            setShowEmailForm(true); 
        }
    };

    const handleSubmitOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        try {
            await axios.post('https://kharthikasarees-backend.onrender.com/verify-otp', { email, otp });
            setIsLoading(false); 
            setStep(3); 
        } catch (err) {
            setIsLoading(false); 
            setError(err.response.data.error || "Invalid OTP");
        }
    };

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true); 
        try {
            await axios.post('https://kharthikasarees-backend.onrender.com/updatepassword', { email, password: newPassword });
            setIsLoading(false); 
            setSuccessMessage("Password updated successfully");
        } catch (err) {
            setIsLoading(false); 
            setError(err.response.data.error || "Failed to update password");
        }
    };

    useEffect(() => {
        if (redirectTimer === 0) {
            navigate('/login');
        }
    }, [redirectTimer, navigate]);

    return (
        <div>
            <div className='forgotFormbg'>
                {showEmailForm && step === 1 && (
                    <form onSubmit={handleSubmitEmail} id='form1'>
                        <h2 id='verifier1'>Mail Id Checker</h2>
                        <input id='em101' type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <button id='sub101' type="submit">Submit</button>
                    </form>
                )}
                {isLoading && !showEmailForm && <div className="loading-container"><div className="loading-spinner"></div><p>Loading...</p></div>}
                {!showEmailForm && step === 2 && (
                    <form onSubmit={handleSubmitOTP} id='form2'>
                        <h2 id='OTP-Verification'>OTP Verifier</h2>
                        <input id='em102' type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOTP(e.target.value)} required />
                        <button id='sub102' type="submit">Verify OTP</button>
                    </form>
                )}
                {step === 3 && (
                    <form onSubmit={handleSubmitNewPassword} id='form3'>
                        <h2 id='passUpdater'>Password Updation</h2>
                        <input id='em103' type="password" placeholder="Enter new password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        <button id='sub103' type="submit">Update Password</button>
                    </form>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && (
                    <p style={{ color: 'green' }}>Password updated successfully. Redirecting to login page in {redirectTimer} seconds...</p>
                )}
            </div>
            <div className='forgotformbg'></div>
        </div>
    );
};

export default ForgotPassword;
