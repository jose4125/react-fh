import { renderHook, act } from "@testing-library/react-hooks";
import { useForm } from "../../hooks/useForm";

describe("useForm tests", () => {
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  test("should return values", () => {
    const { result } = renderHook(() => useForm(initialState));
    const {
      formState,
      handleInputChange,
      resetForm,
      handleSubmit,
    } = result.current;

    expect(formState).toEqual(initialState);
    expect(typeof handleInputChange).toBe("function");
    expect(typeof resetForm).toBe("function");
    expect(typeof handleSubmit).toBe("function");
  });

  test("Should change the name value", () => {
    const value = {
      target: {
        name: "name",
        value: "jose",
      },
    };

    const { result } = renderHook(() => useForm(initialState));
    const { handleInputChange } = result.current;

    act(() => {
      handleInputChange(value);
    });

    const { formState } = result.current;
    expect(formState[value.target.name]).toBe(value.target.value);
    expect(formState).toEqual({
      ...initialState,
      [value.target.name]: value.target.value,
    });
  });

  test("Should change the email value", () => {
    const value = {
      target: {
        name: "email",
        value: "jose4125@gmail.com",
      },
    };

    const { result } = renderHook(() => useForm(initialState));
    const { handleInputChange } = result.current;

    act(() => {
      handleInputChange(value);
    });

    const { formState } = result.current;
    expect(formState[value.target.name]).toBe(value.target.value);
    expect(formState).toEqual({
      ...initialState,
      [value.target.name]: value.target.value,
    });
  });

  test("Should change the password value", () => {
    const value = {
      target: {
        name: "password",
        value: "test1234",
      },
    };

    const { result } = renderHook(() => useForm(initialState));
    const { handleInputChange } = result.current;

    act(() => {
      handleInputChange(value);
    });

    const { formState } = result.current;
    expect(formState[value.target.name]).toBe(value.target.value);
    expect(formState).toEqual({
      ...initialState,
      [value.target.name]: value.target.value,
    });
  });

  test("Should change the email value", () => {
    const value = {
      target: {
        name: "name",
        value: "jose",
      },
    };

    const { result } = renderHook(() => useForm(initialState));
    const { handleInputChange, resetForm } = result.current;

    act(() => {
      handleInputChange(value);
      resetForm();
    });

    const { formState } = result.current;
    expect(formState[value.target.name]).toBe(initialState.name);
    expect(formState).toEqual(initialState);
  });
});
