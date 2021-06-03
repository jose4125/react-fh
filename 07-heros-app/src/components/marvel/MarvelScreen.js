import HeroList from "../heros/HeroList";

const MarvelScreen = () => {
  return (
    <div className="App">
      <h1>Marvel screen</h1>
      <HeroList publisher="Marvel Comics" />
    </div>
  );
};

export default MarvelScreen;
