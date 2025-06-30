// Jada
import "./BoardHeader.css";

function boardHeader() {
    return (
        <>
            <div className="background">
                <img 
                    src="https://images.pexels.com/photos/3233367/pexels-photo-3233367.jpeg"
                    className="background-img"
                    alt="background image"
                />
                <div className="info-container">
                    <div className="text">
                        <h1>Find Any Kudoboard Here</h1>
                        <input 
                        type="text" 
                        className="search"
                        placeholder="Search" />
                    </div>
                       
                </div>
              
            </div>
           
        </>
        
    )
}
export default boardHeader;