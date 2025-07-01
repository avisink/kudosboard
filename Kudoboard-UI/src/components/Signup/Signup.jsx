import React, { useState } from "react";
import axios from "axios";

function Signup({onClose, onSignup}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    // message can hold success or error string
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setMessage(''); // clear message on input change if you want
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // clear previous message

        try {
            const response = await axios.post("http://localhost:3000/users", formData);
            if (onSignup) {
                onSignup(response.data);
            }

            setMessage("Signup successful! Welcome: " + response.data.name + "!");
            setFormData({
                name: "",
                email: "",
                password: ""
            });
            // optionally close modal here if you want:
            // onClose();
        } catch (error) {
            const backendMessage = error.response?.data?.error || "Signup failed. Please try again.";
            setMessage(backendMessage);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="name"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {/* Show message (success or error) */}
                    {message && (
                        <div className={`message ${message.includes('successful') ? 'success-message' : 'error-message'}`}>
                            {message}
                        </div>
                    )}

                    <div className="form-actions">
                        <button 
                            type="button" 
                            className="cancel-btn" 
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="submit-btn"
                        >
                            Signup
                        </button>
                    </div>
                </form>

                <div className="signup-footer">
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
