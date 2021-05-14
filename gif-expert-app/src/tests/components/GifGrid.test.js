import React from "react";
import { shallow } from "enzyme";
import GifGrid from "../../components/GifGrid";
import { useFetchGifs } from "../../hooks/useFetchGifs";

jest.mock("../../hooks/useFetchGifs");

describe("GifGrid tests", () => {
  const props = {
    category: "goku",
  };

  test("should render properly", () => {
    useFetchGifs.mockReturnValue([[], true]);

    const wrapper = shallow(<GifGrid {...props} />);

    expect(wrapper).toMatchSnapshot();
  });

  test("should show images", () => {
    const gifs = [
      {
        id: "wweirwoei",
        title: "goku",
        url: "https://teest.com/test.jpg",
      },
    ];

    useFetchGifs.mockReturnValue([gifs, false]);

    const wrapper = shallow(<GifGrid {...props} />);

    expect(wrapper.find("p").exists()).toBe(false);
    expect(wrapper.find("GifGridItem").exists()).toBe(true);
    expect(wrapper.find("GifGridItem")).toHaveLength(gifs.length);
  });
});
