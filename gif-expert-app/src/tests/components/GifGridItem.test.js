import { shallow } from "enzyme";
import GifGridItem from "../../components/GifGridItem";

describe("GifGridItem tests", () => {
  let wrapper;
  const props = {
    title: "goku image",
    url: "https://localhost/image.jpg",
  };

  beforeEach(() => {
    wrapper = shallow(<GifGridItem {...props} />);
  });

  test("should render properly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should render title", () => {
    const title = wrapper.find("h2").text();
    expect(title).toBe(props.title);
  });

  test("should render image", () => {
    const src = wrapper.find("img").prop("src");
    expect(src).toBe(props.url);
  });

  test("should image should have alt text", () => {
    const alt = wrapper.find("img").prop("alt");
    expect(alt).toBe(props.title);
  });

  test("should have fadein class", () => {
    const animClass = wrapper.find(".card").prop("className");
    expect(animClass).toContain("animate__fadeIn");
  });
});
