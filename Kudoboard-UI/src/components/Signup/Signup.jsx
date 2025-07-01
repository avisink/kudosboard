import React, { useState } from "react";
import axios from "axios";

function Signup({onClose}) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState("");

    const handleInputChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = await axios.post("http://localhost:3000/users", formData);
        setErrors("Signup successful! User ID: " + response.data.id);
        setFormData({
            name: "",
            email: "",
            password: ""
        });
        onClose();
        } catch (error) {
        setErrors("Signup failed: " + error.response?.data?.error || error.errors);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    {errors.general && (
                        <div className="error-message general-error">
                            {errors.general}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email">Name</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && (
                            <span className="error-message">{errors.name}</span>
                        )}
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
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
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
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

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
