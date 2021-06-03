import { Switch, Route, Redirect } from "react-router-dom";
import DcScreen from "../components/dc/DcScreen";
import HeroScreen from "../components/heros/HeroScreen";
import MarvelScreen from "../components/marvel/MarvelScreen";
import SearchScreen from "../components/search/SearchScreen";
import Navbar from "../components/ui/Navbar";

const DashboardRouter = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/marvel">
            <MarvelScreen />
          </Route>
          <Route exact path="/hero/:heroId">
            <HeroScreen />
          </Route>
          <Route path="/dc">
            <DcScreen />
          </Route>
          <Route path="/search">
            <SearchScreen />
          </Route>
          <Redirect to="/marvel" />
        </Switch>
      </div>
    </>
  );
};

export default DashboardRouter;
