// Jada
import BoardHeader from "../BoardHeader/BoardHeader";
import Categories from "../Categories/Categories";
import BoardGrid from "../BoardGrid/BoardGrid";
import Footer from "../Footer/Footer"
import { useState } from "react";



function HomePage({user, setUser}) {
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

const handleClear = () => {
  setSearchTerm('');
  setSubmitTerm(''); 
};

  const [refreshTrigger, setRefreshTrigger] = useState(0);

const handleBoardCreated = () => {
  setRefreshTrigger(prev => !prev);
};

  return (
    <div>
      <BoardHeader 
      searchTerm={searchTerm} 
      setSearchTerm={setSearchTerm}
      handleClear={handleClear}
      handleSubmitClick={handleSubmitClick}
      handleKeyDown={handleKeyDown}
      setCategory={setCategory}
      user={user}
      />
      <Categories 
      setCategory={setCategory}
      category={category}
      setRecentSort={setRecentSort}
      refreshTrigger={refreshTrigger}
      onBoardCreated={handleBoardCreated}
      />
      <BoardGrid 
      submitTerm={submitTerm}
      category={category}
      recentSort={recentSort}
      refreshTrigger={refreshTrigger}
      user={user}
      setUser={setUser}
      />
      
      <Footer />
    </div>
  );
}
export default HomePage;
  