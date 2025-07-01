// Jada
//Ayo edited this so that the view button actually takes you to see the cards
import "./BoardCard.css";
import KudosPage from "../KudosPage/KudosPage";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/boards/${board.id}`);
      if (onDelete) onDelete();
    } catch (err) {
      alert("Failed to delete card.", err);
    }
  };
  return (
    <>
      <div className="board">
        <div className="img-container">
          <img src={board.image_url} alt="board image"></img>
        </div>
        <div className="info">
          <h3>{board.title}</h3>
          <p>{board.description}</p>
          <span className="category">{board.category}</span>
        </div>
        <div className="buttons">
          <button
            className="option"
            onClick={() => navigate(`/boards/${board.id}/cards`)}
          >
            view
          </button>
          <button className="option" onClick={handleDelete}>
        delete
          </button>
        </div>
      </div>
    </>
  );
}

export default BoardCard;
