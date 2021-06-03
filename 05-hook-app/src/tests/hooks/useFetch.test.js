import { renderHook, act } from "@testing-library/react-hooks";
import { useFetch } from "../../hooks/useFetch";

describe("useFetch tests", () => {
  const initialState = {
    data: null,
    loading: true,
  };

  test("should return values", () => {
    const { result } = renderHook(() =>
      useFetch("https://www.breakingbadapi.com/api/quotes/1")
    );
    const { state, error } = result.current;

    expect(state.data).toBeNull();
    expect(state.loading).toBeTruthy();
    expect(error).toBeNull();
  });

  test("Should return data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://www.breakingbadapi.com/api/quotes/1")
    );

    await waitForNextUpdate({ timeout: 2000 });
    const { state, error } = result.current;

    expect(state.data).toHaveLength(1);
    expect(state.loading).toBeFalsy();
    expect(error).toBeNull();
  });

  test("Should return an error", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch("https://reqres.in/apid/users?page=2")
    );

    await waitForNextUpdate({ timeout: 2000 });
    const { state, error } = result.current;

    expect(state.data).toBeNull();
    expect(state.loading).toBeFalsy();
    expect(error).toBe("no se pudo cargar la data");
  });
});
