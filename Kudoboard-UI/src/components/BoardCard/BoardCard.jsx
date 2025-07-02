// Jada
//Ayo edited this so that the view button actually takes you to see the cards
import "./BoardCard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";

function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevent card click when delete button is clicked
    try {
      await axios.delete(`http://localhost:3000/boards/${board.id}`);
      if (onDelete) onDelete();
    } catch (err) {
      alert("Failed to delete card.", err);
    }
  };

  const handleCardClick = () => {
    navigate(`/boards/${board.id}/cards`);
  };

  return (
    <>
      <div className="board" onClick={handleCardClick}>
        <span className="delete-btn" onClick={handleDelete}>
            <MdOutlineDelete />
        </span>
        <div className="img-container">
          <img src={board.image_url} alt="board image"></img>
        </div>
        <div className="info">
          <span className={`category category-${board.category.toLowerCase()}`}>{board.category}</span>
          <h3>{board.title}</h3>
          <p>{board.description}</p>
        </div>
      </div>
    </>
  );
}

export default BoardCard;