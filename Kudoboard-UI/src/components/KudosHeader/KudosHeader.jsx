// Ayo
import "./KudosHeader.css";
import { IoRibbonOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateKudosModal from "../CreateKudosModal/CreateKudosModal";

function KudosHeader () {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchBoard = async () => {
        try {
          const res = await fetch(`http://localhost:3000/boards/${id}`);
          const data = await res.json();
          setBoard(data);
        } catch (err) {
          setBoard({ title: "Board Not Found" }, err);
        }
      };
      fetchBoard();
    }, [id]);

    return (
      <>
        <div className="header">
          <div className="logo-media">
            <div className="logo" onClick={() => navigate("/")}>
              <IoRibbonOutline aria-label="ribbon logo" />
            </div>
          </div>

          <div className="header-content">
            <div className="header-text">
              <h1>KudoBoard</h1>
              <h2>{board ? board.title : "Loading..."}</h2>
            </div>

            <div>
              <button
                className="create-card"
                onClick={() => setShowModal(true)}
              >
                Create Card
              </button>
            </div>
          </div>
        </div>
        {showModal && (
          <CreateKudosModal onClose={() => setShowModal(false)} boardId={id} />
        )}
      </>
    );

}

export default KudosHeader;