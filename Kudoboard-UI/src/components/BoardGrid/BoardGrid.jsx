// Jada
import BoardCard from "../BoardCard/BoardCard";
import "./BoardGrid.css"
import { useEffect, useState } from "react";

function BoardGrid () {

    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const res = await fetch(`http://localhost:3000/boards`);
                const data = await res.json();
                setBoards(data);
            } catch (err) {
                console.error("Failed to fetch boards:", err);
                setError("Could not load boards.");
            }
        };

        fetchBoards();
    }, []);

    return (
        <>
        <div className="page-content">
            <div className="board-list">
                {error && <p>{error}</p>}
                {boards.map((board) => (
                    <BoardCard key={board.id} board={board} />
                ))}
            </div>
        </div>

        </>
    );
};

export default BoardGrid;