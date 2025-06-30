// Ayo
import "./KudosCard.css";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";

function KudosCard({name, description, image, upvoteCount}) {
  return (
    <>
      <div className="KudosCard">
        <div className="kudos-card-header">
          <p className="kudos-card-name">{name}</p>
          <p className="kudos-card-description">{description}</p>
        </div>
        <div className="media">
          <img src={image} alt = {name} /> 
        </div>
        <div className="kudos-card-buttons">
          <span className="upvoteBtn" role="button" aria-label="upvote">
            Upvote: {upvoteCount}
          </span>
          <span className="delete-cardBtn">
            <MdOutlineDelete />
          </span>
        </div>
      </div>
    </>
  );
}


export default KudosCard;
