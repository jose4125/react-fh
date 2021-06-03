import { shallow } from "enzyme";
import { getGifs } from "../../helpers/getGifs";

describe("getGifs tests", () => {
  test("should get 10 elements", async () => {
    const images = await getGifs("goku");
    expect(images).toHaveLength(10);
  });

  test("should get 0 elements", async () => {
    const images = await getGifs("");
    expect(images).toHaveLength(0);
  });
});
