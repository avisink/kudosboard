import { useState } from 'react';
import './Login.css';
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

function Login({onClose, onLogin, setUser}) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [message, setMessage] = useState(''); // holds success or error message
    const [errors, setErrors] = useState({});   // holds field-specific errors

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            setMessage('');
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/users/login", formData);

            if (onLogin) {
                onLogin(response.data);
            }

            setUser(response.data.user);

            setMessage("Login successful! Welcome back " + response.data.user.name + "!");
            console.log(response.data)
            setErrors({});
            setFormData({ email: '', password: '' });
            navigate("/");
            
        } catch (error) {
            const errorMsg = error.response?.data?.error || "Login failed. Please try again.";
            setMessage(errorMsg);
            setErrors({});
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        
        // Clear field error on input change
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
        // Clear general message on input change
        if (message) {
            setMessage('');
        }
    };

    return (
        <div className="modal-overlay auth">
            <div className="modal-content auth-content">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    {/* Show general success or error message */}
                    {message && (
                        <div className={message.toLowerCase().includes('successful') ? "success-message" : "error-message"}>
                            {message}
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
                            onClick={() => navigate("/")}
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
                    <a href="http://localhost:5173/signup">New User?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
