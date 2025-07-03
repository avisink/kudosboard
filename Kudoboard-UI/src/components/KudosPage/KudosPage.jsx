// Ayo
import KudosGrid from "../KudosGrid/KudosGrid";
import KudosHeader from "../KudosHeader/KudosHeader";
import Footer from "../Footer/Footer";
import "./KudosPage.css"
import { useState } from "react";
function KudosPage() {

    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const triggerRefresh = () => setRefreshTrigger(prev => !prev); 

  return (
    <div className="kudospage-root">
      <KudosHeader triggerRefresh={triggerRefresh} />
      <KudosGrid  refreshTrigger={refreshTrigger}/>
      <Footer />
    </div>
  );
}

export default KudosPage;
  