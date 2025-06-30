// Jada
import BoardCard from "../BoardCard/BoardCard";
import "./BoardGrid.css"

function BoardGrid () {
    return (
        <>
        <div className="page-content">
            <div className="board-list">
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
                <BoardCard />
        </div>
        </div>

        </>
    );
};

export default BoardGrid;