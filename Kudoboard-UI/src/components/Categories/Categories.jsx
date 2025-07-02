// jada
import { useState } from "react";
import "./Categories.css"
import { useNavigate } from "react-router-dom";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";

function Categories ({setCategory, setRecentSort}) {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    return (
        <>
        <div className="container">
            <button className="item"
            onClick={() => {setCategory(''); setRecentSort(false)}}
            >All</button>
            <button className="item"
            onClick={() => {setCategory(''); setRecentSort(true)}}
            >Recent</button>
            <button className="item"
            onClick={()=> {setCategory("celebration"); setRecentSort(false)}}
            >Celebration</button>
            <button className="item"
            onClick={() => {setCategory("thank you"); setRecentSort(false)}}
            >Thank You</button>
            <button className="item"
            onClick={() => {setCategory("inspiration"); setRecentSort(false)}}
            >Inspiration</button>
            <button className="item">
                {/* this is gonna need a function to check if someone is logged in. if yes, itll filter, if not, itll prompt them to login */}
                My boards</button>
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