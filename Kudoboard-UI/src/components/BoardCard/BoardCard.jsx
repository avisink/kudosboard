// Jada
import "./BoardCard.css"
import { useNavigate } from "react-router-dom";

function BoardCard ({ board }) {
    const navigate = useNavigate();
    return (
        <>
        <div className="board">
            <div className="img-container">
                <img src={board.image_url}
                alt = "board image">
                </img>
            </div>
            <div className="info">
                <h3>{board.title}</h3>
                <p>{board.description}</p>
                <span className="category">{board.category}</span>
            </div>
            <div className="buttons">
                <button className="option" onClick={() => navigate("/kudos")}>view</button>
                <button className="option">delete</button>
            </div> 
        </div>
        </>
    );

};

export default BoardCard;