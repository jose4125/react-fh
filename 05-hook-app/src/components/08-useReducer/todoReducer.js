export const todoReducer = (state = [], action) => {
  switch (action?.type) {
    case "ADD_TODO":
      return [action.payload, ...state];
    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);
    case "COMPLETE_TODO":
      return state.map(
        (todo) =>
          todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    default:
      return state;
  }
};
