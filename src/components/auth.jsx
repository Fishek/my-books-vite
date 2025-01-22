import { useState } from "react";
import Login from "./login";
import Register from "./register";

export const Auth = () => {
  const [toLogin, setToLogin] = useState(false);


  return (
    <div className="auth-container">
      <div className="auth-section">{toLogin ? <Login /> : <Register />}</div>
      <button onClick={() => setToLogin(true)}>Login</button>
      <button onClick={() => setToLogin(false)}>Register</button>
    </div>
  );
};
