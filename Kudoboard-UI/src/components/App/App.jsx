import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";

import KudosPage from "../KudosPage/KudosPage";
import HomePage from "../Homepage/Homepage";
import CreateBoardModal from "../CreateBoardModal/CreateBoardModal";
import CreateKudosModal from "../CreateKudosModal/CreateKudosModal";

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/kudos">Kudos</Link> |{" "}
            <Link to="/create-board">Create Board</Link> |{" "}
            <Link to="/create-kudos">Create Kudos</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kudos" element={<KudosPage />} />
          <Route path="/create-board" element={<CreateBoardModal />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
