// Jada
import "./BoardHeader.css";
import { useNavigate } from 'react-router-dom';

function BoardHeader() {
    const navigate = useNavigate();
    return (
        <>
            <div className="background">
                <img 
                    src="https://images.pexels.com/photos/3233367/pexels-photo-3233367.jpeg"
                    className="background-img"
                    alt="background image"
                />
                <div className="auth-buttons">
                    <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                    <button className="signup-btn" onClick={() => navigate('/signup')}>Signup</button>
                </div>
                <div className="info-container">
                    <div className="text">
                        <h1>Find Any Kudoboard Here</h1>
                        <input 
                            type="text" 
                            className="search"
                            placeholder="Search" 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BoardHeader;
