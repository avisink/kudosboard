// Jada
import BoardHeader from "../BoardHeader/BoardHeader";
import Categories from "../Categories/Categories";
import BoardGrid from "../BoardGrid/BoardGrid";
import Footer from "../Footer/Footer"
import { useState } from "react";



function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [submitTerm, setSubmitTerm] = useState('');
  const handleSubmitClick = () => {
    setSubmitTerm(searchTerm);
  };
  const handleKeyDown = (e) => {
  console.log(e.key);
  if (e.key === 'Enter') {
    setSubmitTerm(searchTerm);
  }
};
  return (
    <div>
      <BoardHeader 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm}
      handleSubmitClick={handleSubmitClick}
      handleKeyDown={handleKeyDown}
      />
      <Categories />
      <BoardGrid 
      submitTerm={submitTerm}/>
      <Footer />
    </div>
  );
}
export default HomePage;
  