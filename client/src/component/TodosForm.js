const TodosForm = ({
  title,
  status,
  setTitle,
  setStatus,
  isEditing,
  editTodo,
  idUpdated,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length < 1) alert("enter valid title");
    else {
      const body = JSON.stringify({ title, status });
      const res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      });
      const data = await res.json();
      if (data) {
        idUpdated((prev) => !prev);
        setStatus("");
        setTitle("");
      }
    }
  };

  return (
    <div>
      TodosForm
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value={"pending"}>Pending</option>
          <option value={"completed"}>completed</option>
        </select>
        {isEditing ? (
          <button type="button" onClick={() => editTodo(isEditing)}>
            save
          </button>
        ) : (
          <input type={"submit"} value="add" />
        )}
      </form>
    </div>
  );
};

export default TodosForm;
