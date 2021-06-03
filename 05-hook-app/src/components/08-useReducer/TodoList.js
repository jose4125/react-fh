import { TodoListItem } from "./TodoListItem";

export const TodoList = ({ todos, ...props }) => {
  return (
    <ul>
      {todos.map((todo, index) => {
        return (
          <TodoListItem key={todo.id} todo={todo} index={index} {...props} />
        );
      })}
    </ul>
  );
};
