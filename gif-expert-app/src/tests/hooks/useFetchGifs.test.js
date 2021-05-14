import { renderHook } from "@testing-library/react-hooks";
import { useFetchGifs } from "../../hooks/useFetchGifs";

// jest.mock("../../hooks/useFetchGifs");

describe("useFetchGifs tests", () => {
  test("should return initial state", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs("goku")
    );
    const [images, loading] = result.current;
    await waitForNextUpdate();

    expect(images).toHaveLength(0);
    expect(loading).toBe(true);
  });

  test("should return images and loading false", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchGifs("goku")
    );
    await waitForNextUpdate();

    // expect(useFetchGifs).toHaveBeenCalledWith("goku");
    const [images, loading] = result.current;
    expect(images).toHaveLength(10);
    expect(loading).toBe(false);
  });
});
