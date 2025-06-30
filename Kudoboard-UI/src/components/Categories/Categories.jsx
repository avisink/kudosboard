// jada
import { use } from "react";
import "./Categories.css"
import { useNavigate } from "react-router-dom";

function categories () {
    const navigate = useNavigate();
    return (
        <>
        <div className="container">
            <button className="item"
            onClick={() => navigate("/")}>All</button>
            <button className="item">Recent</button>
            <button className="item">Celebration</button>
            <button className="item">Thank You</button>
            <button className="item">Inspiration</button>
        </div>
        <div className="new-container">
            <button className="new-item"
            onClick={() => {navigate("/create-board")}}>Create a New Board</button>
        </div>
       
        </>
    );
};

export default categories;