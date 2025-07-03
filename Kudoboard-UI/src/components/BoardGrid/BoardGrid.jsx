// Jada
import BoardCard from "../BoardCard/BoardCard";
import "./BoardGrid.css"
import { useEffect, useState } from "react";

function BoardGrid ({submitTerm, category, recentSort, refreshTrigger, user}) {
    const [boards, setBoards] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
    const fetchBoards = async () => {
        try {
        let url = `http://localhost:3000/boards?`;

        // Add title search term
        if (submitTerm) {
            url += `title=${encodeURIComponent(submitTerm)}&`;
        }

        // My Boards filter
        if (category === "myboards" && user?.id) {
            url += `author_id=${user.id}&`;
        } else if (category) {
            url += `category=${encodeURIComponent(category)}&`;
        }

        // Sorting
        if (recentSort) {
            url += `sort_by=id&order=desc&`;
        }

        // Remove trailing "&" if present
        if (url.endsWith("&")) {
            url = url.slice(0, -1);
        }

        const res = await fetch(url);
        const data = await res.json();
        setBoards(data);
        } catch (err) {
        console.error("Failed to fetch boards:", err);
        setError("Could not load boards.");
        }
    };

    fetchBoards();
    }, [submitTerm, category, recentSort, refreshTrigger, user]);

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