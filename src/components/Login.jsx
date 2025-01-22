import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const signIn = async (data) => {
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(signIn)}>
        <input
          {...register("email", {
            required: { value: true, message: "Email is required" },
          })}
          placeholder="Email.."
          type="email"
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          {...register("password", {
            required: { value: true, message: "Password is required" },
          })}
          placeholder="Password.."
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
