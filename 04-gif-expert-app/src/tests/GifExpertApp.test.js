import React from "react";
import { shallow } from "enzyme";
import GifExpertApp from "../GifExpertApp";
import GifGrid from "../components/GifGrid";
import AddCategory from "../components/AddCategory";

describe("GifGrid tests", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<GifExpertApp />);
  });

  test("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should have a title", () => {
    expect(wrapper.find("h2").exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("gif expert app");
  });

  test("should show category list", () => {
    const categories = ["goku", "caballeros del zodiaco"];
    const wrapper = shallow(<GifExpertApp defaultCategories={categories} />);

    expect(wrapper.find("GifGrid").exists()).toBe(true);
    expect(wrapper.find("GifGrid")).toHaveLength(categories.length);
  });
});
