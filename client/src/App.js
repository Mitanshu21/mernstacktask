import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Todos from "./component/Todos";
import PublicRoute from "./route/PublicRoute";
import PrivateRoute from "./route/PrivateRoute";
import { useEffect, useState } from "react";

function App() {
  const [loggedUser, setLoggetUser] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) setLoggetUser(true);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute loggedUser={loggedUser} />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute loggedUser={loggedUser} />}>
            <Route path="/todos" element={<Todos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
