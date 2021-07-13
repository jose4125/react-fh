import { mount } from "enzyme";
import { Router, Route } from "react-router-dom";

import { createMemoryHistory } from "history";
import SearchScreen from "../../../components/search/SearchScreen";

describe("test Search Screen", () => {
  test("Should render properly with no parameters", () => {
    const history = createMemoryHistory({
      initialEntries: ["/search"],
    });
    const wrapper = mount(
      <Router history={history}>
        <Route path="/search">
          <SearchScreen />
        </Route>
      </Router>
    );

    expect(wrapper.find("h1").text()).toBe("Search super hero");
    expect(wrapper.find("input").prop("value")).toBe("");
    expect(wrapper.find("button").text()).toBe("Search...");
    expect(wrapper.find(".alert-info").text()).toBe(
      "no heroes to show, search heroes!!!"
    );
    expect(wrapper.find(".card").exists()).toBeFalsy();
  });

  test("Should render the super hero", () => {
    const history = createMemoryHistory({
      initialEntries: ["/search?q=batman"],
    });
    const wrapper = mount(
      <Router history={history}>
        <Route path="/search">
          <SearchScreen />
        </Route>
      </Router>
    );

    expect(wrapper.find("h1").text()).toBe("Search super hero");
    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper.find("button").text()).toBe("Search...");
    expect(wrapper.find(".alert-info").exists()).toBeFalsy();
    expect(wrapper.find(".card").exists()).toBeTruthy();
    expect(wrapper.find(".card-img").exists()).toBeTruthy();
    expect(wrapper.find("a").prop("href")).toBe("/hero/dc-batman");
  });

  test("Should render the warning component", () => {
    const history = createMemoryHistory({
      initialEntries: ["/search?q=batman123"],
    });
    const wrapper = mount(
      <Router history={history}>
        <Route path="/search">
          <SearchScreen />
        </Route>
      </Router>
    );

    expect(wrapper.find("h1").text()).toBe("Search super hero");
    expect(wrapper.find("input").prop("value")).toBe("batman123");
    expect(wrapper.find("button").text()).toBe("Search...");
    expect(wrapper.find(".alert-danger").exists()).toBeTruthy();
    expect(wrapper.find(".card").exists()).toBeFalsy();
  });

  test("Should update the url when the form is submitted", () => {
    const history = createMemoryHistory();
    history.push = jest.fn();
    const wrapper = mount(
      <Router history={history}>
        <SearchScreen />
      </Router>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "search",
        value: "batman",
      },
    });

    expect(wrapper.find("input").prop("value")).toBe("batman");

    const fakeEvent = {
      preventDefault: () => {},
    };
    wrapper.find("form").simulate("submit", fakeEvent);

    expect(history.push).toHaveBeenCalled();
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith("?q=batman");
  });

  test("Should render the super hero when the user search by batman", () => {
    const history = createMemoryHistory();
    const wrapper = mount(
      <Router history={history}>
        <SearchScreen />
      </Router>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "search",
        value: "batman",
      },
    });

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper.find("a").exists()).toBeFalsy();
    expect(wrapper.find(".alert-info").exists()).toBeTruthy();

    const fakeEvent = {
      preventDefault: () => {},
    };
    wrapper.find("form").simulate("submit", fakeEvent);

    wrapper.update();

    expect(wrapper.find("h1").text()).toBe("Search super hero");
    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper.find("button").text()).toBe("Search...");
    expect(wrapper.find(".alert-info").exists()).toBeFalsy();
    expect(wrapper.find(".card").exists()).toBeTruthy();
    expect(wrapper.find(".card-img").exists()).toBeTruthy();
    expect(wrapper.find("a").prop("href")).toBe("/hero/dc-batman");
  });

  test("Should render the warning message when the user search by a hero that does not escist", () => {
    const history = createMemoryHistory();
    const wrapper = mount(
      <Router history={history}>
        <SearchScreen />
      </Router>
    );

    wrapper.find("input").simulate("change", {
      target: {
        name: "search",
        value: "batman123",
      },
    });

    expect(wrapper.find("input").prop("value")).toBe("batman123");
    expect(wrapper.find("a").exists()).toBeFalsy();
    expect(wrapper.find(".alert-info").exists()).toBeTruthy();

    const fakeEvent = {
      preventDefault: () => {},
    };
    wrapper.find("form").simulate("submit", fakeEvent);
    wrapper.update();

    expect(wrapper.find("h1").text()).toBe("Search super hero");
    expect(wrapper.find("input").prop("value")).toBe("batman123");
    expect(wrapper.find("button").text()).toBe("Search...");
    expect(wrapper.find(".alert-danger").exists()).toBeTruthy();
  });
});
