// Jada
import "./BoardCard.css"

function BoardCard () {
    return (
        <>
        <div className="board">
            <div className="img-container">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small_2x/no-image-available-icon-vector.jpg"
                alt = "board image">
                </img>
            </div>
            <div className="info">
                <button className="option">view</button>
                <button className="option">delete</button>
            </div> 
        </div>
        </>
    );

};

export default BoardCard;