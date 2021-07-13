import { mount } from "enzyme";
import { MemoryRouter, Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import HeroScreen from "../../../components/heros/HeroScreen";

describe("test HeroScreen", () => {
  const historyMock = {
    push: jest.fn(),
    listen: jest.fn(),
    location: {},
    createHref: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should redirect the user if the hero doesn't exist", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <Router history={historyMock}>
          <HeroScreen />
        </Router>
      </MemoryRouter>
    );

    expect(wrapper.find("Redirect").exists()).toBeTruthy();
  });

  test("Should render a hero if the hero id is equal to the hero param", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-batman"]}>
        <Route exact path="/hero/:heroId">
          <HeroScreen />
        </Route>
      </MemoryRouter>
    );

    expect(wrapper.find("h3").text()).toBe("Batman");
    expect(wrapper.find("button").text()).toBe("Go back");
  });

  test("Should go back when clicks on the go back button and the history length >= 3 and has a heroId", () => {
    const history = createMemoryHistory({
      initialEntries: ["/hero/dc-batman"],
    });

    history.length = 3;
    history.goBack = jest.fn();
    history.push = jest.fn();

    const wrapper = mount(
      <Router history={history}>
        <Route path="/hero/:heroId">
          <HeroScreen />
        </Route>
      </Router>
    );

    wrapper.find("button").simulate("click");

    expect(history.goBack).toHaveBeenCalled();
    expect(history.push).not.toHaveBeenCalled();
  });

  test("Should go to the DC dashboard when clicks on the go back button and the history length <= 2 and has a heroId", () => {
    const history = createMemoryHistory({
      initialEntries: ["/hero/dc-batman"],
    });

    history.length = 2;
    history.goBack = jest.fn();
    history.push = jest.fn();

    const wrapper = mount(
      <Router history={history}>
        <Route path="/hero/:heroId">
          <HeroScreen />
        </Route>
      </Router>
    );

    wrapper.find("button").simulate("click");

    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledWith("/dc");
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test("Should redirect when the hero not exists", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/dc-bad"]}>
        <Route exact path="/hero/:heroId">
          <HeroScreen />
        </Route>
      </MemoryRouter>
    );

    expect(wrapper).toEqual({});
  });
});
