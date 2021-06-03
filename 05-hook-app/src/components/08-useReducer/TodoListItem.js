export const TodoListItem = ({ todo, index, handleComplete, handleRemove }) => {
  const { id, desc, done } = todo;

  return (
    <li>
      <hr />
      <p onClick={() => handleComplete(id)}>
        {index + 1} {desc}
        {done && " (done, yeah!!)"}
      </p>
      <button onClick={() => handleRemove(id)}>borrar</button>
      <hr />
    </li>
  );
};
