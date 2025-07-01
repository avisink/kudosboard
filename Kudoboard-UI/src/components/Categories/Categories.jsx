// jada
import { useState } from "react";
import "./Categories.css"
import { useNavigate } from "react-router-dom";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";

function categories () {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
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
            onClick={() => setShowModal(true)}>Create a New Board</button>
        </div>
        {showModal && <CreateBoardModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default categories;