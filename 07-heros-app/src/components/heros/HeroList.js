import { useMemo } from "react";
import { getHeroesByPublisher } from "../../selectors/getHeroesByPublisher";
import HeroCard from "./HeroCard";

const HeroList = ({ publisher }) => {
  const heros = useMemo(
    () => {
      return getHeroesByPublisher(publisher);
    },
    [publisher]
  );

  return (
    <div className="card-columns animate__animated animate__fadeIn">
      {heros.map((hero) => {
        return <HeroCard key={hero.id} {...hero} />;
      })}
    </div>
  );
};

export default HeroList;
