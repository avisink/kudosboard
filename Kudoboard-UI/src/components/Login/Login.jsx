import { useState } from 'react';
import './Login.css';
import axios from 'axios'; 

function Login({onClose, onLogin}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        // Basic frontend validation
        const newErrors = {};
        if (!formData.email) {
            newErrors.email = 'Email is required';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await axios.post("/login", formData); // replace with full URL if needed

            if (onLogin) {
                onLogin(response.data);
            }

            setFormData({ email: '', password: '' });
            onClose();
        } catch (error) {
            const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
            setErrors({ general: errorMsg });
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    {errors.general && (
                        <div className="error-message general-error">
                            {errors.general}
                        </div>
                    )}

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
                            Login
                        </button>
                    </div>
                </form>
                
                <div className="login-footer">
                    <a href="#" className="forgot-password">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;