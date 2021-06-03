const initialState = [
  {
    id: 1,
    todo: "comprar pan",
    done: false,
  },
];

const todoReducer = (state = initialState, action) => {
  switch (action?.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    default:
      return state;
  }
};

let todos = todoReducer();

const newTodo = {
  id: 2,
  todo: "estudiar",
  done: false,
};

const addAction = {
  type: "ADD_TODO",
  payload: newTodo,
};

todos = todoReducer(todos, addAction);
console.log(todos);
