import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";
import { TodoAdd } from "./TodoAdd";
import { TodoList } from "./TodoList";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) ?? [];
};

export const TodoApp = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(
    () => {
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos]
  );

  const handleRemove = (todoId) => {
    const action = {
      type: "REMOVE_TODO",
      payload: todoId,
    };

    dispatch(action);
  };

  const handleComplete = (todoId) => {
    const action = {
      type: "COMPLETE_TODO",
      payload: todoId,
    };
    dispatch(action);
  };

  const handleAdd = (newTodo) => {
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
  };

  const todoListProps = {
    todos: todos,
    handleRemove: handleRemove,
    handleComplete: handleComplete,
  };

  return (
    <div>
      <h1>Todo app ({todos.length})</h1>
      <hr />
      <div>
        <TodoAdd handleAdd={handleAdd} />
      </div>
      <TodoList {...todoListProps} />
    </div>
  );
};
