import { shallow } from "enzyme";
import { useFetch } from "../../../hooks/useFetch";
import { MultipleCustomHooks } from "../../../components/03-examples/MultipleCustomHooks";
import { useCounter } from "../../../hooks/useCounter";

jest.mock("../../../hooks/useFetch");
jest.mock("../../../hooks/useCounter");

describe("MultipleCustomHooks tests", () => {
  beforeEach(() => {
    useCounter.mockReturnValue({
      counter: 10,
      increment: () => {},
    });
  });

  test("should render properly", () => {
    useFetch.mockReturnValue({
      state: {
        data: null,
        loading: true,
      },
      error: null,
    });

    const wrapper = shallow(<MultipleCustomHooks />);

    expect(wrapper).toMatchSnapshot();
  });

  test("Should show loading", () => {
    useFetch.mockReturnValue({
      state: {
        data: null,
        loading: true,
      },
      error: null,
    });

    const wrapper = shallow(<MultipleCustomHooks />);

    expect(wrapper.find(".loading").text()).toBe("...Loading");
    expect(wrapper.find("blockquote").exists()).toBeFalsy();
    expect(wrapper.find("button").exists()).toBeFalsy();
  });

  test("Should show data", async () => {
    useFetch.mockReturnValue({
      state: {
        data: [
          {
            quote_id: 12234,
            quote: "this is the quote",
            author: "john doe",
          },
        ],
        loading: false,
      },
      error: null,
    });

    const wrapper = shallow(<MultipleCustomHooks />);

    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.find("blockquote").exists()).toBeTruthy();
    expect(wrapper.find("button").exists()).toBeTruthy();
    expect(wrapper.find(".quote").exists()).toBeTruthy();
    expect(wrapper.find(".quote").text()).toBe("this is the quote");
    expect(wrapper.find("footer").text()).toBe("john doe");
    expect(wrapper.find("button").text()).toBe("next quote");
  });
});
