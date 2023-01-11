import { useState } from "react";
import { json } from "react-router-dom";

const Login = () => {
  const [formInput, setFormInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formInput);

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
    })
      .then((res) => res.json())
      .then((result) => localStorage.setItem("token", result?.token))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div>Login</div>
      <form>
        <input
          type={"text"}
          name="email"
          placeholder="email"
          value={formInput.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formInput.password}
          onChange={handleChange}
        />
        <input type="button" value={"submit"} onClick={handleSubmit} />
      </form>
    </>
  );
};

export default Login;
