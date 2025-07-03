// jada
import { useState } from "react";
import "./Categories.css"
import { useNavigate } from "react-router-dom";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";

function Categories ({setCategory, setRecentSort, category, recentSort}) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    
    // Helper function to determine if a category is active
    const isActive = (cat, isRecent = false) => {
        if (isRecent) {
            return recentSort === true;
        }
        if (cat === '') {
            return category === '' && !recentSort;
        }
        return category === cat && !recentSort;
    };

    return (
        <>
        <div className="container">
            <button 
                className={`item ${isActive('') ? 'active' : ''}`}
                onClick={() => {setCategory(''); setRecentSort(false)}}
            >
                All
            </button>
            <button 
                className={`item ${isActive('', true) ? 'active' : ''}`}
                onClick={() => {setCategory(''); setRecentSort(true)}}
            >
                Recent
            </button>
            <button 
                className={`item ${isActive('celebration') ? 'active' : ''}`}
                onClick={()=> {setCategory("celebration")}}
            >
                Celebration
            </button>
            <button 
                className={`item ${isActive('thank you') ? 'active' : ''}`}
                onClick={() => {setCategory("thank you"); setRecentSort(false)}}
            >
                Thank You
            </button>
            <button 
                className={`item ${isActive('inspiration') ? 'active' : ''}`}
                onClick={() => {setCategory("inspiration"); setRecentSort(false)}}
            >
                Inspiration
            </button>
        </div>
        <div className="new-container">
            <button className="new-item"
            onClick={() => setShowModal(true)}>Create a New Board</button>
        </div>
        {showModal && <CreateBoardModal onClose={() => setShowModal(false)} />}
        </>
    );
};

export default Categories;