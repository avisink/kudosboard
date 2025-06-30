// Ayo
import "./KudosGrid.css"
import KudosCard from "../KudosCard/KudosCard";

//sample data before we do the database

const sampleKudos = [
  {
    id: 1,
    name: "Teamwork Win",
    description: "Great job on the project!",
    image: "src/assets/react.svg",
  },
  {
    id: 2,
    name: "Above & Beyond",
    description: "Thanks for your extra effort.",
    image: "src/assets/react.svg",
  },
  {
    id: 3,
    name: "Creative Thinker",
    description: "Loved your innovative idea.",
    image: "src/assets/react.svg",
  },
];

function KudosGrid () {
    return (
      <>
        <div className="kudoscard-container">
          {sampleKudos.map((kudo) => (
            <KudosCard
              key={kudo.id}
              name={kudo.name}
              description={kudo.description}
              image={kudo.image}
              upvoteCount={kudo.upvoteCount}
            />
          ))}
        </div>
      </>
    );
}

export default KudosGrid