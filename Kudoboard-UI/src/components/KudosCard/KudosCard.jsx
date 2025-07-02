// Ayo
import "./KudosCard.css";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import { useState } from "react";


function KudosCard({ kudos, onDelete }) {
  const [upvotes, setUpvotes] = useState(kudos.upvote_count);
  const handleUpvote = async () => {
    try {
      await axios.put(`http://localhost:3000/cards/${kudos.id}`, {
        upvote_count: upvotes + 1,
      });
      setUpvotes(upvotes + 1);
    } catch (err) {
      alert("Failed to upvote", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/cards/${kudos.id}`);
      if (onDelete) onDelete();
    } catch (err) {
      alert("Failed to delete card.", err);
    }
  };

  return (
    <>
      <div className="KudosCard">
        <div className="media">
          <img src={kudos.gif_url} alt={kudos.title} />
        </div>
        <div className="kudos-info">
          <div className="kudos-card-header">
            <p className="kudos-card-name">{kudos.title}</p>
            <p className="kudos-card-description">{kudos.description}</p>
          </div>
          <div className="kudos-card-buttons">
            <span className="upvoteBtn" role="button" aria-label="upvote" onClick={handleUpvote}>
              Upvote: {upvotes}
            </span>
            <span className="delete-cardBtn" role="button" aria-label="delete" onClick={handleDelete}>
              <MdOutlineDelete />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}


export default KudosCard;
