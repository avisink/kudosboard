import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import KudosPage from "../KudosPage/KudosPage";
import HomePage from "../Homepage/Homepage";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";
import CreateKudosModal from "../CreateKudosModal/CreateKudosModal";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { useState } from "react"
function App() {
  const [user, setUser] = useState(null);
  
  return (
    <Router>
      <div>

        <Routes>
          <Route path="/" element={<HomePage user={user}/>} />
          <Route path="/boards" element={<KudosPage />} />
          <Route path="/boards/:id/cards" element={<KudosPage />} />
          <Route path="/create-board" element={<CreateBoardModal user={user}/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
