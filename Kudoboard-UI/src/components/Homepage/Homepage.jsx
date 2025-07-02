// Jada
import BoardHeader from "../BoardHeader/BoardHeader";
import Categories from "../Categories/Categories";
import BoardGrid from "../BoardGrid/BoardGrid";
import Footer from "../Footer/Footer"
import { useState } from "react";



function HomePage() {
  // recent sort 
  const [recentSort, setRecentSort] = useState(false);
  // categories 
  const [category, setCategory] = useState('');
  // search bar 
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
      setCategory={setCategory}
      />
      <Categories 
      setCategory={setCategory}
      category={category}
      setRecentSort={setRecentSort}
      />
      <BoardGrid 
      submitTerm={submitTerm}
      category={category}
      recentSort={recentSort}/>
      
      <Footer />
    </div>
  );
}
export default HomePage;
  