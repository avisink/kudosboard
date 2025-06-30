// Ayo
import "./KudosHeader.css";
import { IoRibbonOutline } from "react-icons/io5";
import { useState } from "react";
import CreateKudosModal from "../CreateKudosModal/CreateKudosModal";

function KudosHeader () {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <div className="header">
          <div className="logo">
            <IoRibbonOutline aria-label="ribbon logo" />
          </div>
          <div className="header-content">
            <div className="header-text">
              <h1>KudoBoard</h1>
              <h2>Board Title</h2>
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
        {showModal && <CreateKudosModal onClose={() => setShowModal(false)} />}
      </>
    );

}

export default KudosHeader;