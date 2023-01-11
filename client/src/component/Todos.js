import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodosForm from "./TodosForm";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [updated, idUpdated] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchTodo = async () => {
      const res = await fetch("http://localhost:5000/todos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.error) {
        <Navigate to="/" />;
      } else setTodos(data);
    };
    fetchTodo();
  }, [isEditing, updated]);

  const handleClickEdit = (id) => {
    setIsEditing(id);
    let todo = todos.filter((t) => t._id === id);
    console.log(todos, todo);
    if (todo) {
      setStatus(todo[0].status);
      setTitle(todo[0].title);
    }
  };

  const editTodo = (id) => {
    const body = JSON.stringify({ title, status });
    if (title.trim().length < 1) alert("enter valid title");
    else {
      fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body,
      })
        .then((res) => {
          console.log(res);
          setStatus("");
          setTitle("");
          setIsEditing(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteTodo = (id) => {
    const result = window.confirm("Are you sure want to delete!");
    if (result) {
      fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => idUpdated((p) => !p))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={{ paddingLeft: "50px" }}>
      <h2 style={{ padding: "0px 50px" }}>Todos</h2>
      <table style={{ width: "700px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>status</th>
            <th>created time</th>
            <th>updated time</th>
          </tr>
        </thead>
        <tbody>
          {todos?.length > 0 ? (
            todos.map((todo) => (
              <tr key={todo.createdAt}>
                <td>{todo.title}</td>
                <td>{todo.status}</td>
                <td>{todo.createdAt.slice(0, 10)}</td>
                <td>{todo.updatedAt.slice(0, 10)}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => handleClickEdit(todo._id)}
                  >
                    edit
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => deleteTodo(todo._id)}>
                    delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>No todos found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h4>todos form</h4>
        <TodosForm
          title={title}
          setTitle={setTitle}
          status={status}
          setStatus={setStatus}
          isEditing={isEditing}
          editTodo={editTodo}
          idUpdated={idUpdated}
        />
      </div>
    </div>
  );
};

export default Todos;
