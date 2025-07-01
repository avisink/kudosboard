// Jada
import "./BoardHeader.css";
import { IoMdSearch } from "react-icons/io";

function BoardHeader({searchTerm, setSearchTerm, handleSubmitClick, handleKeyDown}) {
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
                        <div className="wrapper">
                            <input 
                            type="text" 
                            value = {searchTerm}
                            className="search"
                            placeholder="Search"
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            onKeyDown={handleKeyDown}/>
                            <IoMdSearch 
                            className="icon"
                            onClick={handleSubmitClick}/>
                        </div>
                    </div>
                    
                       
                </div>
              
            </div>
           
        </>
        
    )
}
export default BoardHeader;