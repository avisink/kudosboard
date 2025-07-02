// Jada
import "./BoardHeader.css";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { MdOutlineClose } from "react-icons/md";

function BoardHeader({ user, searchTerm, setSearchTerm, handleSubmitClick, handleKeyDown }) {
    const navigate = useNavigate();
    console.log(user);
    return (
        <>
        <div className="background">
            <img
            src="https://images.pexels.com/photos/3233367/pexels-photo-3233367.jpeg"
            className="background-img"
            alt="background image"
            />
            <div className="auth-buttons">
            <button className="login-btn" onClick={() => navigate('/login')}>
                Login
            </button>

            <button className="signup-btn" onClick={() => navigate('/signup')}>
                Signup
            </button>
            </div>

            <div className="info-container">
            <div className="text">
                {user && (
                    <h4 className="welcome-message">
                        Welcome, {user.name || user.email}!
                    </h4>
                )}
                <h1>Find Any Kudoboard Here</h1>
                <div className="wrapper">
                <input
                    type="text"
                    value={searchTerm}
                    className="search"
                    placeholder="Search"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                    <div className="search-buttons">
                    <IoMdSearch className="icon" onClick={handleSubmitClick} />
                    <MdOutlineClose 
                        className="clear-btn" 
                        onClick={() => setSearchTerm('')} 
                    />
                    </div>

                </div>
            </div>
            </div>
        </div>
        </>
    );
}

export default BoardHeader;
