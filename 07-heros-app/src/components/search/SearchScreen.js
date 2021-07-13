import { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import HeroCard from "../../components/heros/HeroCard";
import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroByName";

const SearchScreen = () => {
  const history = useHistory();
  const location = useLocation();
  const { q = "" } = queryString.parse(location.search);
  const { formState, handleInputChange } = useForm({
    search: q,
  });

  const heroList = useMemo(() => {
    return getHeroesByName(q);
  }, [q]);

  const handleSubmit = (event) => {
    event.preventDefault();

    history.push(`?q=${formState.search}`);
  };

  return (
    <div>
      <h1>Search super hero</h1>

      <hr />
      <div className="row">
        <div className="col-md-5">
          <h4>Search form</h4>
          <hr />
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="text"
              placeholder="find your hero"
              name="search"
              value={formState.search}
              onChange={handleInputChange}
              autoComplete="off"
            />
            <button
              className="btn btn-block btn-outline-primary m-1"
              type="submit"
            >
              Search...
            </button>
          </form>
        </div>
        <div className="col-md-7">
          <h4>Results</h4>
          <hr />
          {q === "" && (
            <div className="alert alert-info">
              no heroes to show, search heroes!!!
            </div>
          )}
          {q !== "" && !heroList.length && (
            <div className="alert alert-danger">
              there are no heroes with {q}
            </div>
          )}
          {heroList.map((hero) => {
            return <HeroCard key={hero.id} {...hero} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
