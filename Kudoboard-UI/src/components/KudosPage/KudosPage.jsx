// Ayo
import KudosGrid from "../KudosGrid/KudosGrid";
import KudosHeader from "../KudosHeader/KudosHeader";
import Footer from "../Footer/Footer";
import "./KudosPage.css"

function KudosPage() {


  return (
    <div className="kudospage-root">
      <KudosHeader />
      <KudosGrid />
      <Footer />
    </div>
  );
}

export default KudosPage;
  