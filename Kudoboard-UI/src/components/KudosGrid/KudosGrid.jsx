// Ayo
import "./KudosGrid.css"
import KudosCard from "../KudosCard/KudosCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";



function KudosGrid () {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(`http://localhost:3000/boards/${id}/cards`);
        const data = await res.json();
        setCards(data.kudos);
      } catch (err) {
        console.error("Failed to fetch boards:", err);
        setError("Could not load cards.");
      }
    };
    fetchCards();
  }, [ id ]);

  const handleDelete = (cardId) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
  };
  
    return (
      <>
        <div className="kudoscard-container">
          <div className="card-list">
            {error && <p>{error}</p>}
            {cards && cards.length > 0 ? (
              cards.map((kudos) => (
                <KudosCard
                  key={kudos.id}
                  kudos={kudos}
                  onDelete={() => handleDelete(kudos.id)}
                />
              ))
            ) : (
              <p className="placeholder-no-text">
                No cards available. Click the button above to create a card.
              </p>
            )}
          </div>
        </div>
      </>
    );
}

export default KudosGrid