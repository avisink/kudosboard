// Jada
import BoardCard from "../BoardCard/BoardCard";
import "./BoardGrid.css"
import { useEffect, useState } from "react";

function BoardGrid ({submitTerm, category, recentSort}) {
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchBoards = async () => {
            try {
                let res;
                if (recentSort) {
                    res = await fetch(`http://localhost:3000/boards?title=${encodeURIComponent(submitTerm)}&category=${encodeURIComponent(category)}&sort_by=id&order=desc`);
                } else {
                    res = await fetch(`http://localhost:3000/boards?title=${encodeURIComponent(submitTerm)}&category=${encodeURIComponent(category)}`);
                }
                const data = await res.json();
                setBoards(data);
            } catch (err) {
                console.error("Failed to fetch boards:", err);
                setError("Could not load boards.");
            }
        };

        fetchBoards();
    }, [submitTerm, category, recentSort]);

    const handleDelete = (boardId) => {
      setBoards((prev) => prev.filter((board) => board.id !== boardId));
    };
    return (
        <>
        <div className="page-content">
            <div className="board-list">
                {error && <p>{error}</p>}
                {!error && submitTerm && boards.length === 0 && (
                <p> No results found for "{submitTerm}"</p>)}
                {boards.map((board) => (
                    <BoardCard key={board.id} board={board} onDelete={() => handleDelete(board.id)}/>
                ))}
            </div>
        </div>

        </>
    );
};

export default BoardGrid;