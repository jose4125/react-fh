import { useMemo } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { getHeroesById } from "../../selectors/getHeroById";

const HeroScreen = () => {
  const { heroId } = useParams();
  const history = useHistory();
  const hero = useMemo(() => {
    return getHeroesById(heroId);
  }, [heroId]);

  if (!hero) {
    return <Redirect to="/" />;
  }

  const { superhero, publisher, alter_ego, first_appearance, characters } =
    hero;

  const handleGoBack = () => {
    if (history.length >= 3) {
      history.goBack();
    }

    if (history.length <= 2) {
      const main = `/${heroId.match(/[a-z]+/)[0]}`;
      history.push(main);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          className="img-thumbnail animate__animated animate__fadeInLeft animate__faster"
          src={`/assets/heroes/${heroId}.jpg`}
          alt={superhero}
        />
      </div>
      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <p>
              <strong>alter ego: {alter_ego}</strong>
            </p>
          </li>
          <li className="list-group-item">
            <p>
              <strong>publisher: {publisher}</strong>
            </p>
          </li>
          <li className="list-group-item">
            <p>
              <strong>first appearance: {first_appearance}</strong>
            </p>
          </li>
        </ul>
        <hr />
        <h5>Characters</h5>
        <p>{characters}</p>
        <button className="btn btn-outline-info" onClick={handleGoBack}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default HeroScreen;
