import { useState } from "react";
import { auth } from "../firebase";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const signUp = async (data) => {
    const { email, password } = data;
    //above is equivalent to:
    //const email = data.email;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
    npm;
  };

  console.log();

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(signUp)}>
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
            pattern: {
              value: /(?=.*[A-Z])/,
              message: "Password needs at least one upper case letter",
            },
          })}
          placeholder="Password.."
          type="password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          {...register("password2", {
            required: {
              value: true,
              message: "Confirmation password is required",
            },
            validate: (value) =>
              value === password ||
              "Confirmation password must match the password",
          })}
          placeholder="Confirm Password.."
          type="password"
        />
        {errors.password2 && <p>{errors.password2.message}</p>}
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
