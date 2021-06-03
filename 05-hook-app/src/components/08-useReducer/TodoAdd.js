import { useForm } from "../../hooks/useForm";

export const TodoAdd = ({ handleAdd }) => {
  const { formState, handleInputChange, resetForm } = useForm({
    desc: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formState.desc.trim()) return;

    const newTodo = {
      id: new Date().getTime(),
      desc: formState.desc,
      done: false,
    };

    handleAdd(newTodo);
    resetForm();
  };

  return (
    <>
      <h4>agregar todo</h4>
      <span>-----------------------------------------------</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="desc"
          placeholder="nuevo todo"
          autoComplete="off"
          value={formState.desc}
          onChange={handleInputChange}
        />
        <button type="submit">agregar</button>
      </form>
    </>
  );
};
