import React from "react";
import { shallow } from "enzyme";
import AddCategory from "../../components/AddCategory";

describe("AddCategory tests", () => {
  let wrapper;
  const props = {
    onAddCategory: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<AddCategory {...props} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should change the input field", () => {
    const value = "goku";
    wrapper.find("input").simulate("change", {
      target: {
        value,
      },
    });
  });

  test("should not call onAddCategory", () => {
    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(props.onAddCategory).not.toHaveBeenCalled();
  });

  test("should call onAddCategory", () => {
    const value = "goku";

    wrapper.find("input").simulate("change", {
      target: {
        value,
      },
    });

    wrapper.find("form").simulate("submit", { preventDefault() {} });

    expect(props.onAddCategory).toHaveBeenCalled();
    expect(props.onAddCategory).toHaveBeenCalledWith(value);
    expect(props.onAddCategory).toHaveBeenCalledTimes(1);
    expect(wrapper.find("input").prop("value")).toBe("");
  });
});
